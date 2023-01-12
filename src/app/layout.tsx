import { ReactNode } from 'react';
import styles from './layout.module.css';
import '../components/styles.css';

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<main className={styles.main}>
			{children}
		</main>
	);
}
