import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals, url }) => {
	const version = locals.previewMode ? url.searchParams.get('version') : null;
	const directus = getDirectusInstance(fetch);

	const sync = url.searchParams.get('sync');

	const [courses, chapters, settings] = await Promise.all([
		directus.request(readItems('Courses')),
		directus.request(
			readItems('kapitel', {
				fields: ['*', 'kurs.*', 'content.*.*.*', 'parent.title']
			})
		),
		directus.request(readSingleton('courses_page', { version, fields: ['*.*'] }))
	]);

	return {
		courses,
		chapters,
		sync,
		settings,
		title: 'Courses' // needed for layout with breadcrumbs
	};
};
