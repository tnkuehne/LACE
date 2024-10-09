import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import type { PageServerLoad } from './$types';
import { json } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, url, locals }) => {
	const version = locals.previewMode ? url.searchParams.get('version') : null;
	const directus = getDirectusInstance(fetch);

	return {
		courses: directus.request(readItems('Courses')).catch(() => json(500)),
		landing: await directus.request(readSingleton('landing', { version, fields: ['*', 'seo.*'] })).catch(() => {})
	};
};
