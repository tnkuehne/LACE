import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

export const POST: RequestHandler = async ({ request }) => {
	const { id, isCorrect, incorrectAnswers } = await request.json();

	await getDirectusInstance().request(
		createItem('quiz_data', {
			quiz: id,
			correct: isCorrect,
			wrong: incorrectAnswers
		})
	);

	return json({ message: 'Quiz data saved' });
};
