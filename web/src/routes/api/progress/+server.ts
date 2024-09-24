import type { RequestHandler } from './$types';
import { readItems, createItem, updateItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import { json, error } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request, cookies, fetch }) => {
	const directus = getDirectusInstance(fetch);
	const userId = cookies.get('user');

	if (!userId) {
		return error(400, 'User ID not found. Syncing is disabled.');
	}

	const { course, completedChapters, certificateIssued } = await request.json();
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
			const currentCertificateIssued = existingEntries[0].certificate_issued;

			let updatedChapters = completedChapters;
			let updatedCertificateIssued = certificateIssued;

			if (currentChapters) {
				// Merge current progress with new progress
				updatedChapters = [
					...currentChapters,
					...completedChapters.filter(
						(newChapter: { chapter: string }) =>
							!currentChapters.some(
								(existingChapter: { chapter: string }) =>
									existingChapter.chapter === newChapter.chapter
							)
					)
				];
			}

			if (typeof certificateIssued === 'undefined') {
				updatedCertificateIssued = currentCertificateIssued;
			}

			await directus.request(
				updateItem('progress', entryId, {
					completed_chapters: updatedChapters,
					certificate_issued: updatedCertificateIssued
				})
			);
		} else {
			await directus.request(
				createItem('progress', {
					user: userId,
					course,
					completed_chapters: completedChapters,
					certificate_issued: certificateIssued || false
				})
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
		return json({ status: 204, message: 'User ID not found. Syncing is disabled.' });
	}

	const courseId = url.searchParams.get('course');

	// if userId is found but courseID not then syncing is enabled
	if (!courseId) {
		return json({ status: 200, user: userId });
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

		return json(data.length ? data[0] : { completed_chapters: [], certificate_issued: false });
	} catch (error) {
		return error(500, {
			message: 'Failed to fetch progress',
			error: error.message
		});
	}
};

export const POST: RequestHandler = ({ cookies }) => {
	// set user cookie with a unique id
	const userId = crypto.randomUUID();
	cookies.set('user', userId, { path: '/' });
	return json({ user: userId });
};
