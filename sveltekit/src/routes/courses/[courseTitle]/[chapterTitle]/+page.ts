import type { PageLoad } from './$types';
import getDirectusInstance from '$lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, params }) => {
	const { chapterTitle } = params;
	const directus = getDirectusInstance(fetch);

	const chapter = await directus.request(
		readItems('kapitel', {
			filter: { title: chapterTitle },
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
		chapterTitle,
		settings: await directus.request(readSingleton('learning_page'))
	};
};
