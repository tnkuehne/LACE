import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, params }) => {
	const { courseSlug } = params;
	const directus = getDirectusInstance(fetch);

	const [chapters, survey, settings] = await Promise.all([
		directus.request(
			readItems('kapitel', {
				fields: ['*', 'kurs.*', 'content.*.*.*', 'parent.title'],
				filter: { kurs: { slug: courseSlug } }
			})
		),
		directus.request(readSingleton('survey')),
		directus.request(readSingleton('learning_page'))
	]);

	return {
		chapters,
		survey,
		settings
	};
};
