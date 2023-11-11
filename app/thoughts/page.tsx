import ronin from 'ronin';
import type { Thoughts } from '@ronin/andybitz';
import { Link } from "../components/link";
import styles from './page.module.css';
import { Glitch } from '../components/glitch';

export const revalidate = 60;

export default async function Thoughts() {
	const [thoughts] = await ronin<Thoughts>(({ get }) => {
		get.thoughts.orderedBy!.descending = ['postedAt'];
	});

	return (
		<>
			<h1>
				<Glitch>
					/ Thoughts
				</Glitch>
			</h1>
			<div>
				<ul className={styles.thoughtsList}>
					{thoughts.map(thought => {
						if (thought.hidden) {
							return;
						}

						if (!thought.postedAt && process.env.NODE_ENV !== 'development') {
							return;
						}

						return (
							<li>
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
