import { error } from '@sveltejs/kit';
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const directus = getDirectusInstance(fetch);

	try {
		const [coursesResponse, chaptersResponse] = await Promise.all([
			directus.request(readItems('Courses')),
			directus.request(
				readItems('kapitel', {
					fields: ['*', 'kurs.*', 'content.*.*.*', 'parent.title']
				})
			)
		]);

		return {
			courses: coursesResponse || [],
			chapters: chaptersResponse || []
		};
	} catch (err) {
		console.error('Error fetching data:', err);
		throw error(500, `Internal Server Error: ${err.message || err}`);
	}
};
