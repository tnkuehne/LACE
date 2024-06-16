import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const proxyRequest: RequestHandler = async ({ params, request, url }) => {
	const apiUrl = `${env.PRIVATE_APIURL}/${params.path}${url.search}`;
	const method = request.method;
	const headers = new Headers(request.headers);

	// Prepare the request options
	const options: RequestInit = {
		method,
		headers
	};

	// Only set body for methods that support it
	if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
		const body = await request.text(); // use text() to preserve the raw content type
		options.body = body;
	}

	const response = await fetch(apiUrl, options);

	// Handle the response
	const contentType = response.headers.get('content-type') || '';

	if (response.status === 204) {
		return new Response(null, { status: 204 });
	}

	if (contentType.startsWith('application/json')) {
		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: response.status,
			headers: { 'Content-Type': 'application/json' }
		});
	} else if (contentType.startsWith('text/')) {
		const text = await response.text();
		return new Response(text, {
			status: response.status,
			headers: { 'Content-Type': contentType }
		});
	} else if (contentType.startsWith('image/') || contentType === 'application/pdf') {
		const blob = await response.blob();
		return new Response(blob, {
			status: response.status,
			headers: { 'Content-Type': contentType }
		});
	} else {
		// Handle other content types or return a generic error/message
		const text = await response.text();
		return new Response(text, {
			status: response.status,
			headers: { 'Content-Type': contentType }
		});
	}
};

export const GET: RequestHandler = proxyRequest;
export const POST: RequestHandler = proxyRequest;
export const PATCH: RequestHandler = proxyRequest;
export const PUT: RequestHandler = proxyRequest;
export const DELETE: RequestHandler = proxyRequest;
