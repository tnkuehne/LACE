import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const {
		event = 'not provided',
		error = 'not provided',
		statusCode = 'not provided',
		stack = 'not provided',
		message = 'not provided'
	} = await request.json();

	console.log('Error data:', { event, error, statusCode, stack, message });

	let finalStack = stack;
	const requestData = {
		statusCode: statusCode,
		stack: finalStack,
		message: message,
		event: undefined,
		error: undefined
	};

	try {
		// Check if event is in JSON format
		try {
			JSON.parse(event);
			requestData.event = event;
		} catch {
			finalStack += `\nEvent: ${event}`;
		}

		// Check if error is in JSON format
		try {
			JSON.parse(error);
			requestData.error = error;
		} catch {
			finalStack += `\nError: ${error}`;
		}

		requestData.stack = finalStack;

		await getDirectusInstance(fetch).request(createItem('error', requestData));

		return json({ message: 'Error data saved' });
	} catch (err) {
		console.log('Error while saving error data:', err);
		return json({ message: 'Error while saving error data' });
	}
};
