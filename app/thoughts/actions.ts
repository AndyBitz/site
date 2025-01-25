import { get } from 'react-ronin';

export async function getThoughts() {
	const _thoughts = await get.thoughts.orderedBy.descending(['postedAt']);

	const host = process.env.NODE_ENV === 'production'
		? `https://${process.env.VERCEL_URL}`
		: `http://localhost:3000`;

	const thoughts: typeof _thoughts = await fetch(`${host}/_backup/thoughts.json`)
		.then((res) => res.json())
		.then((data) => data.thoughts);

	return thoughts;
}
