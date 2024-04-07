import { error } from '@sveltejs/kit';
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const { courseTitle, chapterTitle } = params;
    const directus = getDirectusInstance(fetch);

    try {
        // Use the readItems method from the Directus SDK
        const response = await directus.request(
            readItems('Chapters', {
                filter: { Course: { Title: courseTitle} },
                fields: ['*', 'Course.*'], // Specify the fields you want to retrieve
            })
        );

        // mark the chapter that is currently being viewed
        response.forEach((chapter) => {
            chapter.active = chapter.Title === chapterTitle;
        });

        if (response && response.length > 0) {
            return {
                chapters: response,
            };
        } else {
            throw error(404, 'Not found');
        }
    } catch (err) {
        console.error('Error fetching chapters:', err);
        throw error(500, 'Internal Server Error');
    }
};
