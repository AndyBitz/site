import ronin from 'ronin';
import type { Thought, Thoughts } from '@ronin/andybitz';
import { Glitch } from '../../components/glitch';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
	const [thoughts] = await ronin<Thoughts>(({ get }) => {
		get.thoughts.orderedBy!.descending = ['postedAt'];
	});

	const params: { slug: string; }[] = [];

	for (const thought of thoughts) {
		if (thought.slug) {
			params.push({ slug: thought.slug });
		}
	}

	return params;
}

export default async function Page({ params }: { params: { slug: string; }}) {
	const [thought] = await ronin<Thought>(({ get }) => {
		get.thought.with = {
			slug: params.slug,
		};
	});

	if (!thought) notFound();

	return (
		<>
			<h1>
				<Glitch>
					{`/ ${thought.title}`}
				</Glitch>
			</h1>
			<pre style={{ overflow: 'scroll' }}>
				{JSON.stringify(thought.text, null, 2)}
			</pre>
		</>
	);
}
