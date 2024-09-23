import { type RequestHandler } from '@sveltejs/kit';
import getDirectusInstance from '$lib/server/directus';
import { readItems, readSingleton } from '@directus/sdk';
import { env } from '$env/dynamic/public';

interface Page {
	url: string;
	updated: string;
}

export const GET: RequestHandler = async () => {
	const directus = getDirectusInstance(fetch);

	const courses = await directus.request(readItems('Courses'));
	const landing = await directus.request(readSingleton('landing'));

	const chapters = await directus.request(
		readItems('kapitel', {
			fields: ['*', 'kurs.*', 'content.*.*.*']
		})
	);

	const pages: Page[] = [
		{ url: '/', updated: landing.date_updated ? landing.date_updated.split('T')[0] : 'N/A' },
		{
			url: '/courses',
			updated: courses
				.map((course) => (course.date_updated ? course.date_updated.split('T')[0] : 'N/A'))
				.sort()
				.reverse()[0]
		},
		...courses.map((course) => ({
			url: `/courses/${course.slug}`,
			updated: course.date_updated ? course.date_updated.split('T')[0] : 'N/A'
		})),
		...chapters.map((chapter) => ({
			url: `/courses/${chapter.kurs.slug}/chapters/${chapter.slug}`,
			updated: chapter.date_updated ? chapter.date_updated.split('T')[0] : 'N/A'
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
					.map(
						(page) => `
            <url>
                <loc>${`${env.PUBLIC_URL}${page.url}`}</loc>
                ${page.updated !== 'N/A' ? `<lastmod>${page.updated}</lastmod>` : ''}
            </url>`
					)
					.join('')}
    </urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
