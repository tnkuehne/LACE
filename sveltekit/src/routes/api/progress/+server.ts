import type { RequestHandler } from './$types';
import { readItems, createItem, updateItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { json, error } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request, cookies }) => {
	const directus = getDirectusInstance(fetch);
	const userId = cookies.get('user');

	if (!userId) {
		return error(400, 'User ID not found. Syncing is disabled.');
	}

	const { course, completedChapters } = await request.json();
	try {
		const existingEntries = await directus.request(
			readItems('progress', {
				filter: {
					user: { _eq: userId },
					course: { _eq: course }
				}
			})
		);

		if (existingEntries.length > 0) {
			const entryId = existingEntries[0].id;
			const result = await directus.request(
				updateItem('progress', entryId, { completed_chapters: completedChapters })
			);
			console.log(result);
		} else {
			await directus.request(
				createItem('progress', { userId, course, completed_chapters: completedChapters })
			);
		}

		return json({ message: 'Progress updated' });
	} catch (err) {
		return error(500, {
			message: 'Failed to update progress',
			error: err.message
		});
	}
};

export const GET: RequestHandler = async ({ url, fetch, cookies }) => {
	const directus = getDirectusInstance(fetch);

	const userId = cookies.get('user');
	const courseId = url.searchParams.get('course');

	if (!userId) {
		return error(400, 'User ID not found. Syncing is disabled.');
	}

	try {
		const data = await directus.request(
			readItems('progress', {
				filter: {
					user: { _eq: userId },
					course: { _eq: courseId }
				}
			})
		);
		return json(data[0]);
	} catch (error) {
		return json({
			message: 'Failed to fetch progress',
			error: error.message
		});
	}
};
