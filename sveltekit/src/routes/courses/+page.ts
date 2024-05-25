import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const directus = getDirectusInstance(fetch);

	return {
		courses: await directus.request(readItems('Courses')),
		chapters: await directus.request(
			readItems('kapitel', {
				fields: ['*', 'kurs.*', 'content.*.*.*', 'parent.title']
			})
		),
		settings: await directus.request(readSingleton('courses_page'))
	};
};
