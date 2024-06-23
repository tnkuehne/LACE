import type { PageServerLoad } from './$types';
import getDirectusInstance from '$lib/server/directus';
import { readItems, readSingleton } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params, url, locals }) => {
	const version = locals.previewMode ? url.searchParams.get('version') : null;
	const { chapterSlug } = params;
	const directus = getDirectusInstance(fetch);

	const chapter = await directus.request(
		readItems('kapitel', {
			filter: { slug: chapterSlug },
			fields: [
				'*',
				'content.collection',
				'content.item.bild',
				'content.item.answers',
				'content.item.question',
				'content.item.type',
				'content.item.id',
				'kurs.*',
				'content.item.answers.sort',
				'parent.title'
			] // Specify the fields you want to retrieve
		})
	);

	if (!chapter.length) {
		error(404, 'Chapter not found');
	}

	return {
		chapter,
		settings: await directus.request(readSingleton('learning_page', { version }))
	};
};
