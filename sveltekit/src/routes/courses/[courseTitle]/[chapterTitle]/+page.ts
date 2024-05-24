import type { PageLoad } from './$types';
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';

export const load: PageLoad = async ({ fetch, params }) => {
	const { chapterTitle } = params;
	const directus = getDirectusInstance(fetch);

	return {
		chapter: await directus.request(
			readItems('kapitel', {
				filter: { title: chapterTitle },
				fields: [
					'*',
					'content.collection',
					'content.item.bild',
					'content.item.answers.text',
					'content.item.answers.correct',
					'content.item.question',
					'kurs.*',
					'content.item.answers.sort',
					'parent.title'
				] // Specify the fields you want to retrieve
			})
		),
		chapterTitle
	};
};
