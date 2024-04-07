import type { PageLoad } from './$types';
import getDirectusInstance from "$lib/directus";
import {readItems} from "@directus/sdk";
import {error} from "@sveltejs/kit";

export const load: PageLoad = async ({ fetch, params }) => {
    const { courseTitle, chapterTitle } = params;
    const directus = getDirectusInstance(fetch);

    try {
        // Use the readItems method from the Directus SDK
        const response = await directus.request(
            readItems('Slides', {
                filter: { Chapter: { Title: chapterTitle} },
                fields: ['*', 'Chapter.*'], // Specify the fields you want to retrieve
            })
        );

        if (response && response.length > 0) {
            return {
                slides: response
            };
        } else {
            return {
                slides: []
            }
        }
    } catch (err) {
        console.error('Error fetching chapters:', err);
        throw error(500, 'Internal Server Error');
    }

};
