import type { Metadata, ResolvingMetadata } from 'next';
import type { Thought, Thoughts } from '@ronin/andybitz';
import ronin from 'ronin';
import { Glitch } from '../../components/glitch';
import { notFound } from 'next/navigation';

type Props = {
	params: { slug: string; title: string; };
	searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
	const [thoughts] = await ronin<Thoughts>(({ get }) => {
		get.thoughts.orderedBy!.descending = ['postedAt'];
	});

	const params: Props['params'][] = [];

	for (const thought of thoughts) {
		if (thought.slug) {
			params.push({ slug: thought.slug, title: thought.title });
		}
	}

	return params;
}

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent?: ResolvingMetadata,
): Promise<Metadata> {
	const resolvedParent = await parent;

	return {
		title: `${params.title} / ${resolvedParent?.title?.absolute}`,
	};
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
