import type { RequestHandler } from './$types';
import { readItems, createItem, updateItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import { json, error } from '@sveltejs/kit';

const mergeChapters = (currentChapters: { chapter: string }[], completedChapters) => {
	return [
		...currentChapters,
		...completedChapters.filter(
			(newChapter: { chapter: string }) =>
				!currentChapters.some(
					(existingChapter: { chapter: string }) => existingChapter.chapter === newChapter.chapter
				)
		)
	];
};

const updateProgress = async (
	directus,
	entryId: string,
	completedChapters,
	certificateIssued: boolean | undefined,
	currentChapters: { chapter: string }[],
	currentCertificateIssued: boolean
) => {
	let updatedChapters = completedChapters;
	let updatedCertificateIssued = certificateIssued;

	if (currentChapters) {
		updatedChapters = mergeChapters(currentChapters, completedChapters);
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
};

const createProgress = async (
	directus,
	userId: string,
	course: string,
	completedChapters,
	certificateIssued: boolean | undefined
) => {
	await directus.request(
		createItem('progress', {
			user: userId,
			course,
			completed_chapters: completedChapters,
			certificate_issued: certificateIssued || false
		})
	);
};

const getExistingEntries = async (directus, userId: string, course: string) => {
	return await directus.request(
		readItems('progress', {
			filter: {
				user: { _eq: userId },
				course: { _eq: course }
			}
		})
	);
};

export const PATCH: RequestHandler = async ({ request, cookies, fetch }) => {
	const directus = getDirectusInstance(fetch);
	const userId = cookies.get('user');

	if (!userId) {
		return error(400, 'User ID not found. Syncing is disabled.');
	}

	const { course, completedChapters, certificateIssued } = await request.json();
	try {
		const existingEntries = await getExistingEntries(directus, userId, course);

		if (existingEntries.length > 0) {
			const entryId = existingEntries[0].id;
			const currentChapters = existingEntries[0].completed_chapters;
			const currentCertificateIssued = existingEntries[0].certificate_issued;

			await updateProgress(
				directus,
				entryId,
				completedChapters,
				certificateIssued,
				currentChapters,
				currentCertificateIssued
			);
		} else {
			await createProgress(directus, userId, course, completedChapters, certificateIssued);
		}

		return json({ message: 'Progress updated' });
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Failed to update progress'
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
		const existingEntries = await getExistingEntries(directus, userId, courseId);

		return json(
			existingEntries.length
				? existingEntries[0]
				: { completed_chapters: [], certificate_issued: false }
		);
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Failed to fetch progress'
		});
	}
};

export const POST: RequestHandler = ({ cookies }) => {
	// set user cookie with a unique id
	const userId = crypto.randomUUID();
	cookies.set('user', userId, { path: '/' });
	return json({ user: userId });
};
