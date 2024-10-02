import type { PageServerLoad } from './$types';
import getDirectusInstance from '$lib/server/directus';
import { readItems, readSingleton } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params, url, locals }) => {
	const version = locals.previewMode ? url.searchParams.get('version') : null;
	const { chapterSlug } = params;
	const directus = getDirectusInstance(fetch);

	const [chapter, settings] = await Promise.all([
		directus.request(
			readItems('kapitel', {
				filter: { slug: chapterSlug },
				fields: [
					'*',
					'content.collection',
					'content.item.*',
					'kurs.*',
					'content.item.answers.sort',
					'parent.title'
				]
			})
		),
		directus.request(readSingleton('learning_page', { version }))
	]);

	if (!chapter.length) {
		error(404, 'Chapter not found');
	}

	return {
		chapter,
		settings
	};
};
