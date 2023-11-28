import Image from 'next/image';
import { links } from './data';
import styles from './page.module.css';
import { Link } from './components/link';
import { Glitch } from './components/glitch';
import type { ReactNode } from 'react';

export default function Page() {
	return (
		<main className={styles.main}>
			<Intro />
			<About />
			<List />
		</main>
	);
}

function Intro() {
	return (
		<div className={styles.intro}>
			<div className={styles.introImage}>
				<Glitch maxBoxWidthAndHeight={80}>
					<Image src="/profile.png?v=1" alt="profile" width={128} height={128} />
				</Glitch>
			</div>
			<div className={styles.introName}>
				<h1><Glitch>Andy</Glitch></h1>
				<span className={styles.introLineBlack} />
				<span className={styles.introLineRed} />
			</div>
		</div>
	);
}

function About() {
	return (
		<div className={styles.about}>
			<p>
				<span>
					I am a programmer and will program anything possible.
				</span>
			</p>

			<p>
				<span>
					I enjoy late night walks through empty streets, pain,
					and video games—especially Dark Souls and Metal Gear.
				</span>
			</p>

			<p>
				<span>
					Busy building <Link href="https://vercel.com/" target="_blank">Vercel</Link> since 2019.
				</span>
			</p>

			<p>
				<span>
					<Link href="mailto:artzbitz@gmail.com">
						Something I can do for you? Don't hesitate.
					</Link>
				</span>
			</p>
		</div>
	);
}

function List() {
	return (
		<div className={styles.list}>
			<ul>
				{links.map((link, index) => {
					const Icon = link.icon;

					return (
						<ListItem
							key={link.title}
							delay={index + 1}
							title={link.title}
							icon={<Icon />}
							href={link.href}
						/>
					);
				})}
			</ul>
		</div>
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
			<Link href={href} target={href.startsWith('http') ? "_blank" : undefined}>
				<span
					style={{ animationDelay: `${delay * 200 + 1600}ms` }}
					className={styles.icon}
				>
					{icon}
				</span>
				<span
					style={{ animationDelay: `${delay * 250 + 1600}ms` }}
					className={styles.listTitle}
				>
					<Glitch>
						{title}
					</Glitch>
				</span>
			</Link>
		</li>
	);
}
