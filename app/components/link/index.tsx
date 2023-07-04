import type { HTMLProps } from 'react';
import styles from './link.module.css';

export function Link({ children, ...rest }: HTMLProps<HTMLAnchorElement>) {
	return (
		<a {...rest} className={styles.link}>
			{children}
		</a>
	);
}
