import type { ReactNode } from 'react';
import { Breadcrumb } from '../components/breadcrumb';
import './layout.css';

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
