'use client';

import { usePathname } from 'next/navigation'
import { Link } from '../link';
import styles from './breadcrumb.module.css';
import { IconCircle } from '../../icons/circle';

function title(input: string) {
	return input[0].toUpperCase() + input.slice(1);
}

export function Breadcrumb() {
	const pathname = usePathname();
	const parts = pathname.split('/').slice(1, -1);

	return (
		<ul className={styles.breadcrumb}>
			<li>
				<Link title="Home" href="/">
					<IconCircle />
				</Link>
			</li>
			{parts.map((part, index, list) => {
				return (
					<li key={`${part}-${index}`}>
						<Link href={`/${list.slice(0, index + 1).join('/')}`}>
							{title(part)}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
