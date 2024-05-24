import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const { courseTitle } = params;
	const directus = getDirectusInstance(fetch);

	return {
		chapters: await directus.request(
			readItems('kapitel', {
				filter: {
					_and: [
						{
							kurs: {
								Title: courseTitle
							},
							parent: {
								_null: true
							}
						}
					]
				},
				fields: ['*', 'kurs.*'] // Specify the fields you want to retrieve
			})
		)
	};
};
