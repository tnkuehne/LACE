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
	console.log('error logging:', error, event, status, message);
	// only log errors if they are not 404s
	//if (status !== 404) await logError(error, event, status, message, null);

	return {
		status,
		message
	};
};
