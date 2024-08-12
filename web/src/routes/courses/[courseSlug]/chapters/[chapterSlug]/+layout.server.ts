import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, params }) => {
	const { courseSlug } = params;
	const directus = getDirectusInstance(fetch);

	return {
		chapters: await directus.request(
			readItems('kapitel', {
				fields: ['*', 'kurs.*', 'content.*.*.*', 'parent.title'],
				filter: { kurs: { slug: courseSlug } }
			})
		),
		survey: await directus.request(readSingleton('survey')),
		settings: await directus.request(readSingleton('learning_page'))
	};
};
