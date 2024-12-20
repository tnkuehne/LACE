import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

// This is the server-side route for saving quiz data to Directus collection to not expose directus token to the client
export const POST: RequestHandler = async ({ request, fetch }) => {
	const { id, isCorrect, incorrectAnswers } = await request.json();

	await getDirectusInstance(fetch).request(
		createItem('quiz_data', {
			quiz: id,
			correct: isCorrect,
			wrong: incorrectAnswers
		})
	);

	return json({ message: 'Quiz data saved' });
};
