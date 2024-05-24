import { get } from 'react-ronin';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { Glitch } from '../../components/glitch';
import { Prosemirror } from '../../components/prosemirror';
import { Comments } from '../../components/comments';

type Props = {
	params: { slug: string; };
	searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
	const thoughts = await get.thoughts.orderedBy.descending(['postedAt']);

	const params: Props['params'][] = [];

	for (const thought of thoughts) {
		if (thought.slug) {
			params.push({ slug: thought.slug });
		}
	}

	return params;
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const resolvedParent = await parent

	const thought = await get.thought.with.slug(params.slug);

	if (!thought) notFound();

	return {
		title: `${thought.title} / ${resolvedParent?.title?.absolute}`,
	};
}

export default async function Page({ params }: { params: { slug: string; }}) {
	const thought = await get.thought.with.slug(params.slug);

	if (!thought) notFound();

	return (
		<>
			<h1>
				<Glitch>
					{`/ ${thought.title}`}
				</Glitch>
			</h1>
			<Prosemirror data={thought.text as unknown as any} />
			<Comments postId={thought.id} />
		</>
	);
}
