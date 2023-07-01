import Image from 'next/image';
import styles from './page.module.css';
import { Link } from './components/link';
import { IconArt } from './icons/art';
import { IconBook } from './icons/book';
import { IconCode } from './icons/code';
import { IconMail } from './icons/mail';
import { IconTwitter } from './icons/twitter';
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
				<Image src="/profile.png" alt="profile" width={128} height={128} />
			</div>
			<div className={styles.introName}>
				<h1>Andy</h1>
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
			<Link href={href} target="_blank">
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
					{title}
				</span>
			</Link>
		</li>
	);
}
