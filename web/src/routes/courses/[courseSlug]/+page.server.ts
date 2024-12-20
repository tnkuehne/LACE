import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params, url, locals }) => {
	const version = locals.previewMode ? url.searchParams.get('version') : null;
	const { courseSlug } = params;
	const directus = getDirectusInstance(fetch);

	const [chapters, settings] = await Promise.all([
		directus.request(
			readItems('kapitel', {
				filter: {
					_and: [
						{
							kurs: {
								slug: courseSlug
							}
						}
					]
				},
				fields: ['*', 'kurs.*', 'parent.title']
			})
		),
		directus.request(readSingleton('course_page', { version }))
	]);

	if (!chapters.length) {
		redirect(307, '/courses');
	}

	return {
		chapters,
		settings,
		title: chapters[0].kurs.Title
	};
};
