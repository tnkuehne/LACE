import type { Handle } from '@sveltejs/kit';
import { PREVIEW_COOKIE_NAME, PREVIEW_SECRET } from '$env/static/private';

// Define the function with the appropriate types
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.previewMode = event.cookies.get(`${PREVIEW_COOKIE_NAME}`) === PREVIEW_SECRET;

	return resolve(event, {
		filterSerializedResponseHeaders: (key: string, value: string) => {
			return key.toLowerCase() === 'content-type';
		}
	});
};
