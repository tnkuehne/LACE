import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const userId = url.pathname.split('/')[2];
	cookies.set('user', userId, {
		path: '/'
	});

	return redirect(302, '/courses?sync=succeeded');
};
