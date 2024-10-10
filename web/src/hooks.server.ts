import type { Handle, HandleServerError } from '@sveltejs/kit';
import { env as envPrivate } from '$env/dynamic/private';
import { logError } from '$lib/logError';

// Define the function with the appropriate types
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.previewMode =
		event.cookies.get(`${envPrivate.PREVIEW_COOKIE_NAME}`) === envPrivate.PREVIEW_SECRET;

	return resolve(event, {
		filterSerializedResponseHeaders: (key: string) => {
			return key.toLowerCase() === 'content-type';
		}
	});
};

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	await logError(error, event, status, message);

	return {
		status,
		message
	};
};
