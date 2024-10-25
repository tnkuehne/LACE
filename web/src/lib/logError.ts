import { env as envPublic } from '$env/dynamic/public';

// Helper function to remove circular references
function sanitizeError(obj) {
	const seen = new WeakSet();
	return JSON.stringify(obj, (key, value) => {
		if (typeof value === 'object' && value !== null) {
			if (seen.has(value)) {
				return '[Circular Reference]';
			}
			seen.add(value);
		}
		return value;
	});
}

export function logError(error, event, status, message, stack) {
	try {
		const url = envPublic.PUBLIC_WEB_URL ? `${envPublic.PUBLIC_WEB_URL}/api/analytics/error` : null;
		if (url) {
			// Sanitize the objects before sending
			const sanitizedPayload = {
				statusCode: status,
				stack: stack ? error.stack : stack,
				message,
				event: event ? sanitizeError(event) : undefined,
				error: error ? sanitizeError(error) : undefined
			};

			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(sanitizedPayload)
			});
		} else {
			console.log('PUBLIC_WEB_URL is undefined. Skipping error logging.');
		}
	} catch (err) {
		console.log('Error while logging error:', err);
	}
}
