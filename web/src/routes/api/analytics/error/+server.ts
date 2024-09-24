import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

export const POST: RequestHandler = async ({ request, fetch }) => {
	let { event, error } = await request.json();
	const { statusCode, stack, message } = await request.json();

	// if event and error is not json format, convert them to json
	if (typeof event === 'object') {
		event = JSON.stringify(event);
	}
	if (typeof error === 'object') {
		error = JSON.stringify(error);
	}

	try {
		await getDirectusInstance(fetch).request(
			createItem('error', {
				statusCode: statusCode,
				stack: stack,
				message: message,
				event: event,
				error: error
			})
		);

		return json({ message: 'Error data saved' });
	} catch (err) {
		console.error('Error while saving error data:', err);
		return json({ message: 'Error while saving error data' });
	}
};
