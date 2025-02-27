import { RichText } from 'react-ronin';
import { get } from 'ronin';
import type { RichTextContent } from 'react-ronin/types';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { Glitch } from '../../components/glitch';
import { Comments } from '../../components/comments';
import type { Thought } from '../../../schema';

type Props = {
	params: { slug: string; };
	searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
	const thoughts = await get.thoughts.orderedBy.descending(['postedAt']) as Array<typeof Thought>;

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

	const thought = await get.thought.with.slug(params.slug) as (typeof Thought) | null;

	if (!thought) notFound();

	return {
		title: `${thought.title} / ${resolvedParent?.title?.absolute}`,
	};
}

export default async function Page({ params }: { params: { slug: string; }}) {
	const thought = await get.thought.with.slug(params.slug) as (typeof Thought) | null;

	if (!thought) notFound();

	return (
		<>
			<h1>
				<Glitch>
					{`/ ${thought.title}`}
				</Glitch>
			</h1>
			<div style={{ whiteSpace: 'pre-wrap' }}>
				<RichText data={thought.text as unknown as RichTextContent} />
			</div>
			<Comments postId={thought.id} />
		</>
	);
}
