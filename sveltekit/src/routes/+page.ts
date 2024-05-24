import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const directus = getDirectusInstance(fetch);

	return {
		courses: await directus.request(readItems('Courses')),
		landing: await directus.request(readSingleton('landing'))
	};
};
