import type { HandleClientError } from '@sveltejs/kit';
import { env as envPublic } from '$env/dynamic/public';

export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	try {
		console.error('Error logging:', error);
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
		console.error('Error while logging error:', err);
	}

	return {
		status,
		message
	};
};
