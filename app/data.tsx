import { IconArt } from './icons/art';
import { IconBook } from './icons/book';
import { IconCode } from './icons/code';
import { IconMail } from './icons/mail';
import { IconTwitter } from './icons/twitter';

export const links: {
	title: string;
	href: string;
	icon: () => JSX.Element;
}[] = [
	{
		title: 'Code',
		href: 'https://github.com/andybitz',
		icon: IconCode,
	},
	{
		title: 'Art',
		href: 'https://dribbble.com/andybitz',
		icon: IconArt,
	},
	{
		title: 'Twitter',
		href: 'https://twitter.com/andybitz_',
		icon: IconTwitter,
	},
	{
		title: 'Thoughts',
		href: '/thoughts',
		icon: IconBook,
	},
	{
		title: 'Mail',
		href: 'mailto:artzbitz@gmail.com',
		icon: IconMail,
	},
];
