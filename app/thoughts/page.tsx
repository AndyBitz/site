import { Link } from "../components/link";
import styles from './page.module.css';

async function getPosts() {
	return {
		posts: [
			{
				title: 'Borrowing: An important thing about Rust',
				postedAt: new Date('2018-08-01T00:00:00.000Z').getTime(),
				externalLink: 'https://medium.com/@AndyBitz/borrowing-an-important-thing-about-rust-3e19c563bf35',
			},
			{
				title: 'On making my first browser-online-multiplayer-game',
				postedAt: new Date('2018-04-11T00:00:00.000Z').getTime(),
				externalLink: 'https://medium.com/@AndyBitz/on-making-my-first-browser-online-multiplayer-game-f0fbce2c9564',
			}
		],
	};
}

export default async function Thoughts() {
	const { posts } = await getPosts();

	return (
		<div>
			<ul className={styles.thoughtsList}>
				{posts.map(post => {
					return (
						<li>
							<h3>
								<Link href={post.externalLink} target="_blank">
									{post.title}
								</Link>
							</h3>
							<div className={styles.thoughtsListSub}>
								<span>
									{new Date(post.postedAt).toISOString().split('T')[0]}
								</span>
								{post.externalLink ? (
									<span>
										&#8212;on Medium
									</span>
								) : null}
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	);
}
