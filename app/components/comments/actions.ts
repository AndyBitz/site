"use server";

import { z } from 'zod';
import { kv } from '@vercel/kv';
import { Ratelimit } from '@upstash/ratelimit';
import { cookies, headers } from 'next/headers';
import { get, add, remove, batch } from 'ronin';
import { stringToBuffer } from './utils';
import { unwrapEC2Sig } from './unwrap-ec2-signature';
import { SignJWT, jwtVerify } from 'jose';
import crypto from 'node:crypto';
import type { Comment, Thought, User } from '../../../schema';

const JWT_COOKIE_NAME = 'andybitz_io_jwt';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_ALG = 'HS256';

/**
 * Global limit for all actions to prevent spam.
 */
async function checkRateLimit() {
	const limitShort = new Ratelimit({
		redis: kv,
		limiter: Ratelimit.slidingWindow(1, '5s'),
	});

	const limitLong = new Ratelimit({
		redis: kv,
		limiter: Ratelimit.slidingWindow(50, '24h'),
	});

	await Promise.all([limitShort, limitLong].map(async (ratelimit) => {
		const result = await ratelimit.limit('ratelimit');
		if (result.success) return;

		const waitFor = result.reset - Date.now();
		throw new Error(`The current rate limit has been exceeded, try again in ${waitFor} milliseconds.`);
	}));
}

export type CommentWithUser = Omit<typeof Comment, 'user'> & { user: typeof User };

/**
 * Loads a set of comments for one post. Optionally accepts a timestamp to
 * load comments after a specific time.
 */
export async function loadComments(postId: string, after?: string): Promise<{
	comments: Array<CommentWithUser>;
	moreAfter?: string;
	moreBefore?: string;
}> {
	headers();

	const comments = await get.comments({
		with: {
			thought: postId
		},
		orderedBy: {
			descending: ['ronin.createdAt'],
		},
		using: ['user'],
		limitedTo: 1,
		after
	}) as Array<CommentWithUser> & { moreAfter?: string; moreBefore?: string; };

	return {
		comments: comments,
		moreAfter: comments.moreAfter,
		moreBefore: comments.moreBefore,
	};
}

/**
 * Posts a comment to a post.
 */
export async function createComment(postId: string, text: string): Promise<CommentWithUser> {
	// TODO: Is there some kind of quality/spam check?
	const validatedComment = z.string()
		.min(3, 'The comment must be at least 3 characters long.')
		.max(512, 'The comment must not be more than 512 characters long.')
		.parse(text);

	const user = await getAuthenticatedUser();
	if (!user) throw new Error('You are not logged in. Log in, in order to post a comment.');

	await checkRateLimit();

	const thought = await get.thought.with.id<typeof Thought | null>(postId);
	if (!thought) throw new Error('No need to comment on a thought that does not concern me.');

	const [comment, loadedUser] = await batch(() => [
		add.comment.with({
			thought: thought.id,
			user: user.id,
			text: validatedComment,
		}) as unknown as Promise<typeof Comment>,
		get.user.with.id<typeof User>(user.id),
	]);

	// TODO: Could use proper escaping
	const escapedComment = validatedComment.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
	await sendToTelegram(`<b>${user.username}</b> left a comment on <b>${thought.title}</b>:\n\n${escapedComment}`);

	return {...comment, user: loadedUser };
}

/**
 * Deletes a comment.
 */
export async function deleteComment(commentId: string) {
	const user = await getAuthenticatedUser();
	if (!user) throw new Error('Not authorized to delete comment.');

	const comment = await get.comment.with.id<typeof Comment | null>(commentId);
	if (comment?.user !== user.id) throw new Error('Not authorized to delete comment.');

	await remove.comment.with.id<typeof Comment | null>(commentId);
}

/**
 * Removes the cookie to let the user sign out.
 */
export async function signOut() {
	(await cookies()).delete(JWT_COOKIE_NAME);
}

/**
 * Gets the currently authenticated user from the JWT cookie.
 */
export async function getAuthenticatedUser() {
	const jwtCookie = (await cookies()).get(JWT_COOKIE_NAME)?.value;
	if (!jwtCookie) return null;

	const verify = await jwtVerify(jwtCookie, JWT_SECRET).catch((error) => {
		console.error('Failed to validate JWT', error);
		return null;
	});

	if (!verify) return null;

	return {
		id: verify.payload.sub as string,
		username: verify.payload.name as string,
	};
}

/**
 * Retrieves a user by username if it exists, and creates a challange
 * for the sign up or log in.
 */
export async function getUserAndChallenge(username: string) {
	headers();

	validateUsername(username);

	const user = await get.user.with.username<typeof User | null>(username);

	const publicUserId = user
		? user.publicUserId
		: `user_${crypto.randomBytes(16).toString('hex')}`;

	const challenge = new Uint8Array(256);
	crypto.getRandomValues(challenge);

	return {
		publicUserId,
		publicKey: user?.publicKey ? user.publicKey as unknown as PublicKey : null,
		challenge: Array.from(challenge),
	};
}

/**
 * All is base64 encoded
 */
interface PublicKey {
	id: string;
	authenticatorData: string;
	publicKey: string;
	publicKeyAlgorithm: number; // Should always be -7
	transports: string[]
}

function validateUsername(username: string) {
	// Validate the `username`
	z.string()
		.min(3, 'Username must be at least 3 characters long')
		.max(24, 'Username must not be longer than 24 characters.')
		.parse(username);
}

/**
 * Creates a user record in Ronin and sets a JWT cookie on the current
 * request to have the newly created user signed in.
 */
export async function createUser(
	publicUserId: string,
	username: string,
	publicKey: PublicKey
) {
	headers();

	validateUsername(username);

	// Validate the `publicUserId`
	z.string()
		.regex(/^user_[a-f0-9]{32}$/, 'Public User ID did not match the pattern.')
		.parse(publicUserId);

	// Validate `publicKey`
	z.object({
		id: z.string(),
		authenticatorData: z.string(),
		publicKey: z.string(),
		publicKeyAlgorithm: z.literal(-7),
		transports: z.array(z.string()),
	}).parse(publicKey);

	if (JSON.stringify(publicKey).length > 1024) {
		throw new Error('Public key is too large.');
	}

	await checkRateLimit();

	const user = await add.user.with({
		publicUserId,
		username,
		publicKey: publicKey,
	}) as typeof User;

	await createJWTCookie(user);
}

/**
 * All is base64 encoded
 */
interface SignedData {
	id: string;
	challenge: number[];
	authenticatorData: string;
	clientDataJSON: string;
	signature: string;
}

/**
 * Note: shoule be fine not to validate input, as the validtion can
 *       only be successful if the signed data is correct, which uses
 *       the public key from the data.
 */
export async function verifyUser(username: string, signedData: SignedData) {
	headers();

	await checkRateLimit();

	const user = await get.user.with.username<typeof User | null>(username);

	if (!user) return null;

	const publicKeyRaw = user.publicKey as unknown as PublicKey;
	const publicKeyInfo = stringToBuffer(publicKeyRaw.publicKey);

	const publicKey = await crypto.subtle.importKey(
		'spki',
		publicKeyInfo,
		{
			name: 'ECDSA',
			namedCurve: 'P-256'
		},
		true,
		['verify']
	);

	const signatureRaw = stringToBuffer(signedData.signature);
	const signature = await unwrapEC2Sig(signatureRaw);

	const authData = stringToBuffer(signedData.authenticatorData);

	const clientData = stringToBuffer(signedData.clientDataJSON);
	const clientDataHash = await crypto.subtle.digest('SHA-256', clientData);

	const data = Buffer.concat([Buffer.from(authData), Buffer.from(clientDataHash)]);

	const isVerified = await crypto.subtle.verify(
		{
			name: 'ECDSA',
			hash: 'SHA-256',
		},
		publicKey,
		signature,
		data,
	);

	if (!isVerified) {
		throw new Error('Authentication failed. Someone else might already use this username and you do not have access to it.');
	}

	await createJWTCookie(user);
}

/**
 * Creates and sets the JWT cookie based on a user.
 */
async function createJWTCookie(user: typeof User) {
	const payload = {
		sub: user.id,
		name: user.username,
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
	};

	const jwt = await new SignJWT(payload)
		.setProtectedHeader({ alg: JWT_ALG })
		.sign(JWT_SECRET);

	(await cookies()).set(JWT_COOKIE_NAME, jwt);
}

/**
 * Sends a message to me through my Telegram bot.
 */
async function sendToTelegram(message: string) {
	const userId = process.env.TELEGRAM_USER_ID;
	const botToken = process.env.TELEGRAM_BOT_TOKEN;

	const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: userId,
			text: message,
			parse_mode: 'HTML'
		}),
	});

	if (!response.ok) {
		console.error(`Failed to send message to Telegram: ${await response.text()}`);
	}
}
