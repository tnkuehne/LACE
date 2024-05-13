import type { Handle } from '@sveltejs/kit'; // Import the Handle type from SvelteKit
// Import the Handle type from SvelteKit

// Define the function with the appropriate types
export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		filterSerializedResponseHeaders: (key: string, value: string) => {
			return key.toLowerCase() === 'content-type';
		}
	});
};
