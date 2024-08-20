import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url, locals }) => {
	const version = locals.previewMode ? url.searchParams.get('version') : null;
	const directus = getDirectusInstance(fetch);

	return {
		courses: await directus.request(readItems('Courses', { version })),
		landing: await directus.request(readSingleton('landing', { version, fields: ['*.*'] }))
	};
};
