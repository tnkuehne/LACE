import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ params, url }) => {
	const apiUrl = `${env.PRIVATE_APIURL}/${params.path}${url.search}`;

	const response = await fetch(apiUrl);

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
};

export const POST: RequestHandler = async ({ params, request }) => {
	const apiUrl = `${env.PRIVATE_APIURL}/${params.path}`;
	const body = await request.json();

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...request.headers
		},
		body: JSON.stringify(body)
	});

	const responseBody = await response.text();

	if (response.status === 204) {
		return new Response(null, { status: 204 });
	}

	const data = responseBody ? JSON.parse(responseBody) : {};
	return new Response(JSON.stringify(data), {
		status: response.status,
		headers: { 'Content-Type': 'application/json' }
	});
};
