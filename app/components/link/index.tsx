import { useMemo, type HTMLProps } from 'react';
import NextLink from 'next/link';
import styles from './link.module.css';

export function Link({ children, ...rest }: HTMLProps<HTMLAnchorElement>) {
	if (!rest.href?.startsWith('http')) {
		const { href, ...props } = rest;

		return (
			<NextLink href={{
				pathname: href,
			}} {...props} className={styles.link}>
				{children}
			</NextLink>
		);
	}

	return (
		<a {...rest} className={styles.link}>
			{children}
		</a>
	);
}
