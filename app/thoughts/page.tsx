import ronin from 'ronin';
import type { Thoughts } from '@ronin/andybitz';
import { Link } from "../components/link";
import styles from './page.module.css';

export const revalidate = 60;

export default async function Thoughts() {
	const [thoughts] = await ronin<Thoughts>(({ get }) => {
		get.thoughts.orderedBy!.descending = ['postedAt'];
	});

	return (
		<div>
			<ul className={styles.thoughtsList}>
				{thoughts.map(thought => {
					if (!thought.postedAt) {
						return;
					}

					return (
						<li>
							<h3>
								<Link href={thought.externalLink} target="_blank">
									{thought.title}
								</Link>
							</h3>
							<div className={styles.thoughtsListSub}>
								<span>
									{new Date(thought.postedAt).toISOString().split('T')[0]}
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
	);
}
