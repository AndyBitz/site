import { Link } from "../components/link";
import styles from './page.module.css';
import { Glitch } from '../components/glitch';
import { thoughtList } from '../thought-list';

export const revalidate = 60;

export default async function Thoughts() {
	// const thoughts = await get.thoughts.orderedBy.descending(['postedAt']);

	return (
		<>
			<h1>
				<Glitch>
					/ Thoughts
				</Glitch>
			</h1>
			<div>
				<ul className={styles.thoughtsList}>
					{thoughtList.map(thought => {
						if (!thought.postedAt && process.env.NODE_ENV !== 'development') {
							return;
						}

						return (
							<li key={thought.slug}>
								<h3>
									{thought.externalLink ? (
										<Link href={thought.externalLink} target="_blank">
											{thought.title}
										</Link>
									) : (
										<Link href={`/thoughts/${thought.slug}`}>
											{thought.title}
										</Link>
									)}
								</h3>
								<div className={styles.thoughtsListSub}>
									<span>
										{thought.postedAt
											? new Date(thought.postedAt).toISOString().split('T')[0]
											: 'unpublished'
										}
									</span>
									{thought.externalLink ? (
										<span>
											&#8212;on Medium
										</span>
									) : null}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
}
