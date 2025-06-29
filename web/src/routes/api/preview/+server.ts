import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

// need to set a cookie with the preview secret and redirect to the original URL with the version parameter
export const GET: RequestHandler = async ({ url, cookies, setHeaders }) => {
	const secret = url.searchParams.get('secret');
	const slug = url.searchParams.get('slug');
	const version = url.searchParams.get('version');

	if (secret !== `${env.PREVIEW_SECRET}`) {
		error(401, 'Unauthorized');
	}

	// Set a cookie with the session token
	cookies.set(`${env.PREVIEW_COOKIE_NAME}`, `${env.PREVIEW_SECRET}`, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'strict'
	});

	// Since this endpoint is called from the Directus Studio on
	// every content change, we'll make sure not to cache it.
	setHeaders({
		'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
	});

	redirect(307, `/${slug ? slug.replace(/^\//, '') : ''}?version=${version}`);
};
