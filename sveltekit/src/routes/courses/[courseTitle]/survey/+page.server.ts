import { redirect } from '@sveltejs/kit';
import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { Actions } from './$types';

export const load = async () => {
	redirect(303, '/certification');
};

export const actions = {
	default: async ({ request, fetch, url }) => {
		const directus = getDirectusInstance(fetch);
		const formData = await request.formData();
		const formDataEntries = Object.fromEntries(formData);

		// the number of answers is arbitrary
		await directus.request(
			createItem('survey_data', {
				answers: Object.entries(formDataEntries).map(([question, answer]) => ({
					question,
					answer
				}))
			})
		);

		// Process the form data and perform actions
		return redirect(303, `/certification?course=${url.searchParams.get('course')}`);
	}
} satisfies Actions;
