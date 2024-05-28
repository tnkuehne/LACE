import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const directus = getDirectusInstance(fetch);

	const { path, referrer } = await request.json();
	let ip = getClientAddress();

	// Strip the "::ffff:" prefix if present
	if (ip.startsWith('::ffff:')) {
		ip = ip.replace('::ffff:', '');
	}

	await directus.request(
		createItem('page_views', {
			path,
			referrer,
			ip
		})
	);

	return json({ success: true });
};
