import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Define the function with the appropriate types
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.previewMode = event.cookies.get(`${env.PREVIEW_COOKIE_NAME}`) === env.PREVIEW_SECRET;

	return resolve(event, {
		filterSerializedResponseHeaders: (key: string, value: string) => {
			return key.toLowerCase() === 'content-type';
		}
	});
};
