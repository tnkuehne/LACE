import type { RequestHandler } from '../../../../.svelte-kit/types/src/routes';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ request, cookies, url }) => {
	const referer = request.headers.get('referer');

	// remove version parameter from the URL
	const modified_referer = new URL(referer);
	modified_referer.searchParams.delete('version');

	cookies.delete(`${env.PREVIEW_COOKIE_NAME}`, { path: '/' });

	redirect(302, modified_referer || url.origin || '/');
};
