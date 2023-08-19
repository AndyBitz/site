import { IconArt } from './icons/art';
import { IconBook } from './icons/book';
import { IconCode } from './icons/code';
import { IconMail } from './icons/mail';
import { IconTwitterX } from './icons/twitter-x';

export const links: {
	title: string;
	href: string;
	icon: () => JSX.Element;
}[] = [
	{
		title: 'Thoughts',
		href: '/thoughts',
		icon: IconBook,
	},
	{
		title: 'Code',
		href: 'https://github.com/andybitz',
		icon: IconCode,
	},
	{
		title: 'T̵w̵i̵t̵t̵e̵r̵ X',
		href: 'https://twitter.com/andybitz_',
		icon: IconTwitterX,
	},
	{
		title: 'Art',
		href: 'https://dribbble.com/andybitz',
		icon: IconArt,
	},
	{
		title: 'Mail',
		href: 'mailto:artzbitz@gmail.com',
		icon: IconMail,
	},
];
