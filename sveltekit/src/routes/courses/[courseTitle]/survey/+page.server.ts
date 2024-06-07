import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async () => {
	redirect(303, '/certification');
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log(formData);
		// Process the form data and perform actions
		return { success: true };
	}
} satisfies Actions;
