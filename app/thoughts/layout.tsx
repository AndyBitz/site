import type { Metadata, ResolvingMetadata } from 'next';
import type { ReactNode } from 'react';
import { Breadcrumb } from '../components/breadcrumb';
import './layout.css';

type Props = {
	params: {}
}

export async function generateMetadata(
	_props: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const resolvedParent = await parent;

	return {
		title: `Thoughts / ${resolvedParent?.title?.absolute}`,
	};
}

export default function Layout({ children }: { children: ReactNode; }) {
	return (
		<main>
			<header>
				<Breadcrumb />
			</header>

			{children}
		</main>
	);
}
