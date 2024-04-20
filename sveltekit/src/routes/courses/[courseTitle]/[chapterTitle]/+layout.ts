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
            readItems('kapitel', {
                fields: ['*', 'kurs.*', 'content.*.*.*', 'parent.title'],
                filter: { kurs: { Title: courseTitle} },
            })
        );

        let count: number = 0;
        let activeChapter: number = 0;

        // mark the chapter that is currently being viewed
        response.forEach((chapter) => {
            count++;
            if (chapter.title === chapterTitle) {
                chapter.active = true;
                chapter.index = count;
                activeChapter = count;
            }
        });

        let progress: number = (activeChapter / count) * 100;

        if (response && response.length > 0) {
            return {
                chapters: response,
                progress: progress,
            };
        } else {
            throw error(404, 'Not found');
        }
    } catch (err) {
        console.error('Error fetching chapters:', err);
        throw error(500, 'Internal Server Error');
    }
};
