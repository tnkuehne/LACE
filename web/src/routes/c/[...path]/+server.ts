import { redirect, type RequestHandler } from '@sveltejs/kit';

// set a cookie with the user id and redirect to the courses page for syncing
export const GET: RequestHandler = async ({ url, cookies }) => {
	const userId = url.pathname.split('/')[2];
	cookies.set('user', userId, {
		path: '/'
	});

	return redirect(302, '/courses?sync=succeeded');
};
