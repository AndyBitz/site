import { useCallback } from 'react';
import { deleteComment, getAuthenticatedUser, loadComments } from './actions';
import { Button } from './button';
import styles from './styles.module.css';

/**
 * List all comments for a given post and includes
 * functionality to load more.
 */
export function CommentList({
	user,
	comments,
	loading,
	hasMore,
	loadMore,
	removeComment,
}: {
	user?: Awaited<ReturnType<typeof getAuthenticatedUser>>,
	comments: Awaited<ReturnType<typeof loadComments>>[],
	loading: boolean;
	hasMore: boolean;
	loadMore: () => Promise<void>
	removeComment: (id: string) => void;
}) {
	const hasComments = comments[0].comments.length > 0;

	const onDeleteComment = useCallback(async (id: string) => {
		removeComment(id);
		await deleteComment(id);
	}, [user, removeComment]);

	return  (
		<div className={styles.commentList}>
			<div>
				{comments.map(list => {
					return list.comments.map(comment => {
						const date = new Date(comment.ronin.createdAt).toISOString();

						return (
							<div key={comment.id} className={styles.comment}>
								<div className={styles.commentHead}>
									<div>
										<span className={styles.commentAuthor}>{comment.username}</span>
										&nbsp;wrote on&nbsp;
										<span title={date}>{date.split('T')[0]}</span>
									</div>
									<div>
										{user?.id === comment.user ? (
											<Button onClick={() => onDeleteComment(comment.id)}>Delete.</Button>
										) : null}
									</div>
								</div>
								<p>{comment.text}</p>
							</div>
						);
					});
				}).flat()}
			</div>

			<div className={styles.commentListButton}>
				<Button
					className={styles.loadMoreButton}
					onClick={() => loadMore()}
					disabled={!hasMore || loading}
				>
					{!hasComments ? 'No comments yet.' : null}
					{!hasMore && hasComments ? 'All comments are shown.' : null}
					{hasMore && !loading ? 'Load more.' : null}
					{hasMore && loading ? 'Loading...' : null}
				</Button>
			</div>
		</div>
	);
}
