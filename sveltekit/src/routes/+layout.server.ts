import type { PageLoad } from './$types';

export const load: PageLoad = async ({ locals }) => {
	return {
		previewMode: locals.previewMode
	};
};
