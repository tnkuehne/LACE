import { readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, url, locals }) => {
	const version = locals.previewMode ? url.searchParams.get('version') : null;
	const directus = getDirectusInstance(fetch);

	return {
		landing: await directus.request(readSingleton('landing', { version, fields: ['*.*'] }))
	};
};
