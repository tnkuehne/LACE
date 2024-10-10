import { env as envPublic } from '$env/dynamic/public';

export async function logError(error, event, status: number, message: string) {
	console.error('Error logging:', error);
	try {
		await fetch(`${envPublic.PUBLIC_WEB_URL}/api/analytics/error`, {
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
}
