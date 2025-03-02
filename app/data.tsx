import type { ReactNode } from 'react';

function Container({ letter }: { letter: string; }) {
	return (
		<span style={{ fontSize: 24, lineHeight: 1, width: 24, height: 24, display: 'inline-block' }}>
			{letter}
		</span>
	);
}

export const links: {
	title: string;
	href: string;
	icon: () => ReactNode;
}[] = [
	{
		title: 'Thoughts',
		href: '/thoughts',
		// ansuz => odin, inspiration, wisdom
		icon: () => <Container letter="&#5800;" />
	},
	{
		title: 'Code',
		href: 'https://github.com/andybitz',
		// fehu => cattle, livestock, wealth
		icon: () => <Container letter="&#5792;" />
	},
	{
		title: 'T̵w̵i̵t̵t̵e̵r̵ X',
		href: 'https://twitter.com/andybitz_',
		// kaunan => torch, fire, mallady, death
		icon: () => <Container letter="&#5810;" />
	},
	{
		title: 'Art',
		href: 'https://dribbble.com/andybitz',
		// jēran => year, earth, harvest
		icon: () => <Container letter="&#5827;" />
	},
	{
		title: 'Mail',
		href: 'mailto:artzbitz@gmail.com',
		// raidō => horse, ride, journey
		icon: () => <Container letter="&#5809;" />
	},
];
