import { FormEvent, useCallback, useRef, useState } from 'react';
import { Button } from './button';
import { createUser, getAuthenticatedUser, getUserAndChallenge, verifyUser, createComment, signOut, CommentWithUser } from './actions';
import { bufferToString, stringToBuffer } from './utils';
import styles from './styles.module.css';
import type { Comment } from '../../../schema';

/**
 * Allows to sign in, sign out, and post a comment.
 */
export function CommentInput({
	postId,
	user,
	onLogIn,
	unshiftComment,
}: {
	postId: string;
	onLogIn: () => Promise<void>;
	user?: Awaited<ReturnType<typeof getAuthenticatedUser>>;
	unshiftComment: (comment: CommentWithUser) => void;
}) {
	const [isLoading, setLoading] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [isSignedIn, setIsSignedIn] = useState(Boolean(user));
	const [error, setError] = useState<null | string>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const postComment = useCallback(async (formData: FormData) => {
		if (isLoading) return;
		setLoading(true);

		try {
			const text = formData.get('text')!.toString();
			const comment = await createComment(postId, text);

			// @ts-ignore
			formRef.current!.elements['text'].value = '';

			unshiftComment(comment);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				throw error;
			}
		} finally {
			setLoading(false);
		}
	}, [postId, isLoading]);

	const onSignOut = useCallback(async (event: FormEvent) => {
		event.preventDefault();
		if (isLoading) return;

		try {
			await signOut();
			await onLogIn();
			setIsSignedIn(false);

			// @ts-ignore
			formRef.current!.elements['username'].value = '';
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				throw error;
			}
		}
	}, [isLoading]);

	const signIn = useCallback(async (formData: FormData) => {
		if (isLoading) return;
		setLoading(true);

		try {
			const username = formData.get('username')!.toString();

			const {
				publicUserId,
				publicKey,
				challenge,
			} = await getUserAndChallenge(username);

			if (publicKey) {
				const credential = await navigator.credentials.get({
					publicKey: {
						challenge: Uint8Array.from(challenge),
						allowCredentials: [{
							type: 'public-key',
							id: stringToBuffer(publicKey.id),
						}],
						userVerification: 'required'
					}
				}) as null | PublicKeyCredential;

				if (!credential) throw new Error('Missing credential.');
				const response = credential.response as AuthenticatorAssertionResponse;

				const signedData = {
					challenge: challenge,
					id: bufferToString(credential.rawId),
					authenticatorData: bufferToString(response.authenticatorData),
					clientDataJSON: bufferToString(response.clientDataJSON),
					signature: bufferToString(response.signature),
				};

				await verifyUser(username, signedData);
				await onLogIn();
				setIsSignedIn(true);
			} else {
				const credential = await navigator.credentials.create({
					publicKey: {
						challenge: Uint8Array.from(challenge),
						rp: { name: 'andybitz.io' },
						user: {
							id: new TextEncoder().encode(publicUserId),
							name: username,
							displayName: username,
						},
						// Only support ES256 for now
						pubKeyCredParams: [{ type: 'public-key', alg: -7 }]
					}
				}) as PublicKeyCredential | null;

				if (!credential) throw new Error('No credential.');
				const response = credential.response as AuthenticatorAttestationResponse;

				const key = {
					id: bufferToString(credential.rawId),
					authenticatorData: bufferToString(response.getAuthenticatorData()),
					publicKey: bufferToString(response.getPublicKey()!),
					publicKeyAlgorithm: response.getPublicKeyAlgorithm(),
					transports: response.getTransports(),
				};

				await createUser(publicUserId, username, key);
				await onLogIn();
				setIsSignedIn(true);
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				throw error;
			}
		} finally {
			setLoading(false);
		}
	}, [postId, isLoading, onLogIn]);

	if (!showInput) {
		return (
			<Button
				onClick={() => setShowInput(s => !s)}
				className={styles.writeCommentButton}
			>
				{!showInput ? 'Write a comment.' : 'Don\'t write a comment.'}
			</Button>
		);
	}

	return (
		<div>
			<form ref={formRef} className={styles.writeCommentForm} action={isSignedIn ? postComment : signIn}>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					name="username"
					defaultValue={user?.username}
					type="text"
					readOnly={isSignedIn}
					required
				/>
				{isSignedIn ? (
					<div className={styles.writeCommentFormSignOut}>
						<Button onClick={onSignOut}>Sign out.</Button>
					</div>
				) : null}
				{isSignedIn ? (
					<>
						<label htmlFor="text">Comment</label>
						<textarea id="text" name="text" required />
					</>
				) : null}
				{isSignedIn ? (
					<Button type="submit" disabled={isLoading}>Post comment.</Button>
				) : (
					<Button type="submit" disabled={isLoading}>Log in or sign up.</Button>
				)}
				{!isSignedIn ? (
					<div className={styles.writeCommentFormNote}>
						Signing up will create a passkey on your device,
						which you can use to log in again. This ensures that
						nobody else can use the same username.
					</div>
				) : null}
				{error ? (
					<div className={styles.writeCommentFormError}>{error}</div>
				) : null}
			</form>
		</div>
	);
}
