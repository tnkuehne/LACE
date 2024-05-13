import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ params, url }) => {
	const apiUrl = `${env.PRIVATE_APIURL}/${params.path}${url.search}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			// Handle HTTP error responses
			throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
		}

		// Check the content type to decide how to handle the data
		const contentType = response.headers.get('content-type') || '';
		if (contentType.startsWith('application/json')) {
			const data = await response.json();
			return new Response(JSON.stringify(data), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		} else if (contentType.startsWith('image/') || contentType === 'application/pdf') {
			// Forward binary data like images or PDFs
			const blob = await response.blob();
			return new Response(blob, {
				status: response.status,
				headers: { 'Content-Type': contentType }
			});
		} else {
			// Handle other content types or return a generic error/message
			return new Response('Content type not supported', { status: 415 });
		}
	} catch (err) {
		// Handle fetch errors or other errors
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
