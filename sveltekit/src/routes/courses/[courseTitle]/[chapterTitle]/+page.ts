import type { PageLoad } from './$types';
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import type { Question } from '$lib/types';

export const load: PageLoad = async ({ fetch, params }) => {
	const { courseTitle, chapterTitle } = params;
	const directus = getDirectusInstance(fetch);

	try {
		// Use the readItems method from the Directus SDK
		const response = await directus.request(
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
		);

		return {
			chapter: response[0]
		};
	} catch (err) {
		console.error('Error fetching chapters:', err);
		throw error(500, 'Internal Server Error');
	}
};
