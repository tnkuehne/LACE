import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const { event, error, statusCode, stack, message } = await request.json();
	console.log('Error logging:', event, error, statusCode, stack, message);

	// if event and error is not json format, convert them to json
	const eventString = typeof event === 'object' ? JSON.stringify(event) : event;
	const errorString = typeof error === 'object' ? JSON.stringify(error) : error;

	try {
		await getDirectusInstance(fetch).request(
			createItem('error', {
				statusCode: statusCode,
				stack: stack,
				message: message,
				event: eventString,
				error: errorString
			})
		);

		return json({ message: 'Error data saved' });
	} catch (err) {
		console.error('Error while saving error data:', err);
		return json({ message: 'Error while saving error data' });
	}
};
