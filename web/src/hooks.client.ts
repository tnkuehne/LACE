import type { HandleClientError } from '@sveltejs/kit';
import { logError } from '$lib/logError';

export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	await logError(error, event, status, message);

	return {
		status,
		message
	};
};
