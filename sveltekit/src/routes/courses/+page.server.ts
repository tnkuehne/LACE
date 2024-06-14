import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, locals, url }) => {
	const version = locals.previewMode ? url.searchParams.get('version') : null;
	const directus = getDirectusInstance(fetch);

	const sync = url.searchParams.get('sync');

	return {
		courses: await directus.request(readItems('Courses')),
		chapters: await directus.request(
			readItems('kapitel', {
				fields: ['*', 'kurs.*', 'content.*.*.*', 'parent.title']
			})
		),
		sync,
		settings: await directus.request(readSingleton('courses_page', { version }))
	};
};
