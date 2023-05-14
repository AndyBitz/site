import { IconArt } from './vectors/art';
import { IconBook } from './vectors/book';
import { IconCode } from './vectors/code';
import { IconMail } from './vectors/mail';
import { IconTwitter } from './vectors/twitter';
import type { ReactNode } from 'react';
import styles from './list.module.css';

export function List() {
	return (
		<section className={styles.list}>
			<div>
				<ul>
					<ListItem
						delay={1}
						title="Code"
						icon={<IconCode />}
						href="https://github.com/andybitz"
					/>
					<ListItem
						delay={2}
						title="Art"
						icon={<IconArt />}
						href="https://dribbble.com/andybitz/"
					/>
					<ListItem
						delay={3}
						title="Twitter"
						icon={<IconTwitter />}
						href="https://twitter.com/andybitz_"
					/>
					<ListItem
						delay={4}
						title="Blog"
						icon={<IconBook />}
						href="https://medium.com/@AndyBitz"
					/>
					<ListItem
						delay={5}
						title="Mail"
						icon={<IconMail />}
						href="mailto:artzbitz@gmail.com"
					/>
				</ul>
			</div>
		</section>
	);
}

function ListItem({
	icon,
	title,
	href,
	delay,
}: {
	icon: ReactNode;
	title: string;
	href: string;
	delay: number;
}) {
	return (
		<li className={styles.listItem}>
			<a href={href} target="_blank">
				<span
					style={{ animationDelay: `${delay * 200 + 1800}ms` }}
					className={styles.icon}
				>
					{icon}
				</span>
				<span
					style={{ animationDelay: `${delay * 250 + 1800}ms` }}
					className={styles.title}
				>
					{title}
				</span>
			</a>
		</li>
	);
}
