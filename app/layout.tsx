import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './layout.css';

const title = 'hello ^•^/';
const url = 'https://andybitz.io';
const image = `${url}/og.png`;
const description = 'Programming, Design, Art, and all the other things I love.';

export const metadata: Metadata = {
	metadataBase: new URL('https://andybitz.io'),
	title,
	description,
	icons: {
		shortcut: '/favicon.png',
	},
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: 'website',
		url,
		images: image,
	},
	twitter: {
		card: 'summary',
		site: '@andybitz_',
		title,
		description,
		images: image,
		creator: '@andybitz_',
	},
};

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
