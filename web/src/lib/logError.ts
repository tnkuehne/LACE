import { env as envPublic } from '$env/dynamic/public';

export function logError(error, event, status: number, message: string) {
	console.log('Error logging:', error);
	try {
		const url = envPublic.PUBLIC_WEB_URL ? `${envPublic.PUBLIC_WEB_URL}/api/analytics/error` : null;
		if (url) {
			fetch(url, {
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
		} else {
			console.log('PUBLIC_WEB_URL is undefined. Skipping error logging.');
		}
	} catch (err) {
		console.log('Error while logging error:', err);
	}
}
