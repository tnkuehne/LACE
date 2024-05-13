import { error } from '@sveltejs/kit';
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const directus = getDirectusInstance(fetch);

	try {
		const [coursesResponse, landingResponse] = await Promise.all([
			directus.request(readItems('Courses')),
			directus.request(readSingleton('landing'))
		]);

		return {
			courses: coursesResponse || [],
			landing: landingResponse || {}
		};
	} catch (err) {
		console.error('Error fetching data:', err);
		throw error(500, `Internal Server Error: ${err.message || err}`);
	}
};
