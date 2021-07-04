import { Meta } from './meta';
import { ReactNode } from 'react';
import Head from 'next/head';
import styles from './layout.module.css';

export function Layout({
	title,
	children,
}: {
	title?: string;
	children: ReactNode;
}) {
	return (
		<main className={styles.main}>
			<Meta title={title} />
			<Head>
				<link
					href="https://fonts.googleapis.com/css?family=Roboto"
					rel="stylesheet"
				/>
			</Head>
			{children}
		</main>
	);
}
