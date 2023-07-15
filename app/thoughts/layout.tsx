import type { ReactNode } from 'react';
import { Link } from '../components/link';
import { Glitch } from '../components/glitch';
import './layout.css';

export default function Layout({ children }: { children: ReactNode; }) {
	return (
		<main>
			<header>
				<h1>
					<Glitch>
						Thoughts
					</Glitch>
				</h1>

				<div>
					<Link href="/">
						Home
					</Link>
				</div>
			</header>

			{children}
		</main>
	);
}
