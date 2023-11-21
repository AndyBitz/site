"use server";

import ronin from 'ronin';
import { cookies, headers } from 'next/headers';
import type { Comment, Comments, Thought, User } from '@ronin/andybitz';
import { stringToBuffer } from './utils';
import { unwrapEC2Sig } from './unwrap-ec2-signature';
import { SignJWT, jwtVerify } from 'jose';
import crypto from 'node:crypto';

const JWT_COOKIE_NAME = 'andybitz_io_jwt';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_ALG = 'HS256';

/**
 *
 */
export async function loadComments(postId: string, after?: string) {
	headers();

	const [comments] = await ronin<Comments>(({ get }) => {
		get.comments = {
			with: {
				thought: postId
			},
			orderedBy: {
				descending: ['ronin.createdAt'],
			},
			limitedTo: 1,
			after,
		};
	});

	return {
		comments: comments,
		moreAfter: comments.moreAfter,
		moreBefore: comments.moreBefore,
	};
}

/**
 *
 */
export async function createComment(postId: string, text: string) {
	const user = await getAuthenticatedUser();
	if (!user) throw new Error('You are not logged in. Log in, in order to post a comment.');

	const [thought] = await ronin<Thought>(({ get }) => {
		get.thought.with = { id: postId };
	});
	if (!thought) throw new Error('No need to comment on a thought that does not concern me.');

	// TODO: Validate comment

	const [comment] = await ronin<Comment>(({ create }) => {
		create.comment.with = {
			thought: thought.id,
			user: user.id,
			username: user.username,
			text,
		};
	});

	return comment;
}

/**
 *
 */
export async function deleteComment(commentId: string) {
	const user = await getAuthenticatedUser();
	if (!user) throw new Error('Not authorized to delete comment.');

	const [comment] = await ronin<Comment>(({ get }) => {
		get.comment.with = { id: commentId };
	});
	if (comment?.user !== user.id) throw new Error('Not authorized to delete comment.');

	await ronin(({ drop }) => {
		drop.comment.with = { id: commentId };
	});
}

/**
 *
 */
export async function signOut() {
	cookies().delete(JWT_COOKIE_NAME);
}

/**
 *
 */
export async function getAuthenticatedUser() {
	const jwtCookie = cookies().get(JWT_COOKIE_NAME)?.value;
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
 *
 */
export async function getUserAndChallenge(username: string) {
	headers();

	const [user] = await ronin<User>(({ get }) => {
		get.user = {
			with: {
				username,
			},
		};
	});

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

/**
 *
 */
export async function createUser(
	publicUserId: string,
	username: string,
	publicKey: PublicKey
) {
	headers();

	// TODO:
	// - Add rate limit
	// - Add captcha
	// - Validate `publicUserId`
	//   - must be 32 byte hex
	// - Validate username
	// - Validate public key
	//   - how?

	const [user] = await ronin<User>(({ create }) => {
		create.user.with = {
			publicUserId,
			username,
			publicKey: publicKey,
		};
	});

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

	// TODO:
	// - Add a rate limit

	const [user] = await ronin<User>(({ get }) => {
		get.user.with = {
			username: username,
		};
	});

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
 *
 */
async function createJWTCookie(user: User) {
	const payload = {
		sub: user.id,
		name: user.username,
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
	};

	const jwt = await new SignJWT(payload)
		.setProtectedHeader({ alg: JWT_ALG })
		.sign(JWT_SECRET);

	cookies().set(JWT_COOKIE_NAME, jwt);
}
