import { error } from '@sveltejs/kit';
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const { courseTitle } = params;
    const directus = getDirectusInstance(fetch);

    try {
        // Use the readItems method from the Directus SDK
        const response = await directus.request(
            readItems('kapitel', {
                filter: { kurs: { Title: courseTitle} },
                fields: ['*', 'kurs.*'], // Specify the fields you want to retrieve
            })
        );

        if (response && response.length > 0) {
            return {
                chapters: response
            };
        } else {
            return {
                chapters: []
            }
        }
    } catch (err) {
        console.error('Error fetching chapters:', err);
        throw error(500, 'Internal Server Error');
    }
};
