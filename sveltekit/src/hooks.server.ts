import type { Handle, HandleServerError } from '@sveltejs/kit';
import { env as envPublic } from '$env/dynamic/public';
import { env as envPrivate } from '$env/dynamic/private';

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
	try {
		console.error('Error logging error:', error);
		// Send the log entry to your logging endpoint
		await fetch(`${envPublic.PUBLIC_URL}/api/analytics/error`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				statusCode: status,
				stack: error.stack,
				message,
				event,
				error
			})
		});
	} catch (err) {
		console.error('Error logging error:', err);
	}

	return {
		status,
		message
	};
};
