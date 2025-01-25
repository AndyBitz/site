import { RichText, get } from 'react-ronin';
import type { RichTextContent } from 'react-ronin/types';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { Glitch } from '../../components/glitch';
import { Comments } from '../../components/comments';
import { getThoughts } from '../actions';

type Props = {
	params: { slug: string; };
	searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60; // Revalidate every minute

async function getThought(slug: string) {
	// const thought = await get.thought.with.slug(slug);
	const thought = await getThoughts()
		.then((data) => data.find(t => t.slug === slug));

	return thought;
}

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

	const thought = await getThought(params.slug);
	if (!thought) notFound();

	return {
		title: `${thought.title} / ${resolvedParent?.title?.absolute}`,
	};
}

export default async function Page({ params }: { params: { slug: string; }}) {
	const thought = await getThought(params.slug);
	if (!thought) notFound();

	return (
		<>
			<h1>
				<Glitch>
					{`/ ${thought.title}`}
				</Glitch>
			</h1>
			<div style={{ whiteSpace: 'pre' }}>
				<RichText data={thought.text as unknown as RichTextContent} />
			</div>
			<Comments postId={thought.id} />
		</>
	);
}
