import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const { courseTitle } = params;
	const directus = getDirectusInstance(fetch);

	return {
		chapters: await directus.request(
			readItems('kapitel', {
				fields: ['*', 'kurs.*', 'content.*.*.*', 'parent.title'],
				filter: { kurs: { Title: courseTitle } }
			})
		),
		survey: await directus.request(readSingleton('survey')),
		settings: await directus.request(readSingleton('learning_page'))
	};
};
