import type { RequestHandler } from './$types';
import { readItems, createItem, updateItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { json, error } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

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

			const currentChapters = existingEntries[0].completed_chapters;

			// Merge current progress with new progress
			const updatedChapters = [
				...currentChapters,
				...completedChapters.filter(
					(newChapter: { chapter: string }) =>
						!currentChapters.some(
							(existingChapter: { chapter: string }) =>
								existingChapter.chapter === newChapter.chapter
						)
				)
			];

			await directus.request(
				updateItem('progress', entryId, { completed_chapters: updatedChapters })
			);
		} else {
			await directus.request(
				createItem('progress', { user: userId, course, completed_chapters: completedChapters })
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

	if (!userId) {
		return error(400, 'User ID not found. Syncing is disabled.');
	}

	const courseId = url.searchParams.get('course');

	// if userId is found but courseID not then syncing is enabled
	if (!courseId) {
		return json({ user: userId });
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

		return json(data.length ? data[0] : { completed_chapters: [] });
	} catch (error) {
		return error(500, {
			message: 'Failed to fetch progress',
			error: error.message
		});
	}
};

export const POST: RequestHandler = ({ cookies }) => {
	// set user cookie with a unique id
	const userId = uuidv4();
	cookies.set('user', userId, { path: '/' });
	return json({ user: userId });
};
