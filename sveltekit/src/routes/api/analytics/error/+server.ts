import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

export const POST: RequestHandler = async ({ request }) => {
	const { statusCode, stack, message, event, error } = await request.json();

	await getDirectusInstance().request(
		createItem('error', {
			statusCode: statusCode,
			stack: stack,
			message: message,
			event: event,
			error: error
		})
	);

	return json({ message: 'Error data saved' });
};
