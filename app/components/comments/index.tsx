"use client";

import { useCallback, useState } from 'react';
import { Button } from './button';
import styles from './styles.module.css';
import { CommentList } from './comment-list';
import { loadComments, getAuthenticatedUser } from './actions';
import { CommentInput } from './comment-input';
import { Comment, Comments } from '@ronin/andybitz';

/**
 * Either asks to show the comments, or renders them.
 */
export function Comments({ postId }: { postId: string }) {
	const [user, setUser] = useState<undefined | Awaited<ReturnType<typeof getAuthenticatedUser>>>();
	const [loading, setLoading] = useState(false);

	const [comments, setComments] = useState<Awaited<ReturnType<typeof loadComments>>[]>([]);
	const moreAfter = comments[comments.length - 1]?.moreAfter;
	const hasMore = Boolean(moreAfter);

	const unshiftComment = useCallback(async (comment: Comment) => {
		setComments((prev) => {
			const next = [
				{
					comments: [comment] as unknown as Comments,
					moreAfter: comment.ronin.createdAt.getTime().toString(),
					moreBefore: comment.ronin.createdAt.getTime().toString(),
				},
				...prev,
			];

			return next;
		});
	}, [setComments]);

	const removeComment = useCallback((id: string) => {
		setComments((prev) => {
			return prev.map(data => {
				return {
					...data,
					comments: data.comments.filter(comment => {
						return comment.id !== id;
					}),
				};
			}).filter(data => data.comments.length > 0);
		});
	}, [setComments]);

	const loadMore = useCallback(async () => {
		setLoading(true);

		try {
			const nextPage = await loadComments(postId, moreAfter);
			setComments((prev) => [...prev, nextPage]);
		} finally {
			setLoading(false);
		}
	}, [comments, setComments]);

	const showComments = useCallback(async () => {
		setLoading(true);

		try {
			const [
				user,
				comments,
			] = await Promise.all([
				getAuthenticatedUser(),
				loadComments(postId),
			]);

			setUser(user);
			setComments([comments]);
		} finally {
			setLoading(false);
		}
	}, [postId]);

	const onLogIn = useCallback(async () => {
		const user = await getAuthenticatedUser();
		setUser(user);
	}, []);

	return (
		<div className={styles.comments}>
			{comments.length > 0 ? (
				<>
					<h3>Comments</h3>
					<CommentInput
						user={user}
						postId={postId}
						onLogIn={onLogIn}
						unshiftComment={unshiftComment}
					/>
					<CommentList
						user={user}
						comments={comments}
						loading={loading}
						hasMore={hasMore}
						loadMore={loadMore}
						removeComment={removeComment}
					/>
				</>
			) : (
				<Button className={styles.showCommentsButton} disabled={loading} onClick={(e) => {
					e.preventDefault();
					void showComments();
				}}>
					Show comments.
				</Button>
			)}
		</div>
	);
}
