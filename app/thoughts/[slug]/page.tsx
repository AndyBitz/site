import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { Glitch } from '../../components/glitch';
import { thoughtList } from '../../thought-list';

type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
	const params: { slug: string }[] = [];

	for (const thought of thoughtList) {
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
	const resolvedParent = await parent;
	const params = await props.params;

	const thought = thoughtList.find((t) => t.slug === params.slug);
	if (!thought) notFound();

	return {
		title: `${thought.title} / ${resolvedParent?.title?.absolute}`,
	};
}

export default async function Page(props: Props) {
	const params = await props.params;
	const thought = thoughtList.find((t) => t.slug === params.slug);

	if (!thought) notFound();

	return (
		<>
			<h1>
				<Glitch>{`/ ${thought.title}`}</Glitch>
			</h1>
			<div style={{ whiteSpace: 'pre-wrap' }}>
				{thought.text.map((para, index) => {
					return <p key={index}>{para}</p>;
				})}
			</div>
		</>
	);
}
