import { env as envPublic } from '$env/dynamic/public';

export function logError(error, event, status: number, message: string) {
	console.log('Error logging:', error);
	try {
		fetch(`${envPublic.PUBLIC_WEB_URL}/api/analytics/error`, {
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
		console.log('Error while logging error:', err);
	}
}
