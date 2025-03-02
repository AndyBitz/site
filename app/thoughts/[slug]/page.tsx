import { get } from 'ronin';
import { RichText } from '@ronin/react';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { Glitch } from '../../components/glitch';
import { Comments } from '../../components/comments';
import type { Thought } from '../../../schema';

type Props = {
	params: Promise<{ slug: string; }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
	const thoughts = await get.thoughts.orderedBy.descending(['postedAt']) as Array<typeof Thought>;

	const params: { slug: string; }[] = [];

	for (const thought of thoughts) {
		if (thought.slug) {
			params.push({ slug: thought.slug });
		}
	}

	return params;
}

export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const resolvedParent = await parent
	const params = await props.params;

	const thought = await get.thought.with.slug<typeof Thought | null>(params.slug);

	if (!thought) notFound();

	return {
		title: `${thought.title} / ${resolvedParent?.title?.absolute}`,
	};
}

export default async function Page(props: Props) {
	const params = await props.params;
	const thought = await get.thought.with.slug<typeof Thought | null>(params.slug);

	if (!thought) notFound();

	return (
		<>
			<h1>
				<Glitch>
					{`/ ${thought.title}`}
				</Glitch>
			</h1>
			<div style={{ whiteSpace: 'pre-wrap' }}>
				<RichText data={thought.text} />
			</div>
			<Comments postId={thought.id} />
		</>
	);
}
