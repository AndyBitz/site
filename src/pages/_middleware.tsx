import type { NextFetchEvent, NextRequest } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	const userAgent = req.headers.get('user-agent');

	const country = req.headers.get('x-vercel-ip-country');
	const region = req.headers.get('x-vercel-ip-country-region');
	const city = req.headers.get('x-vercel-ip-city');

	console.log(
		`Country: ${country}\n` +
		`Region: ${region}\n` +
		`City: ${city}\n\n` +
		`User-Agent: ${userAgent}\n\n`
	);

	return;
}
