import { error } from '@sveltejs/kit';
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const directus = getDirectusInstance(fetch);

    try {
        // Use the readItems method from the Directus SDK
        const response = await directus.request(readItems('Courses'));

        if (response && response.length > 0) {
            return {
                courses: response
            };
        } else {
            throw error(404, 'Not found');
        }
    } catch (err) {
        console.error('Error fetching courses:', err);
        throw error(500, 'Internal Server Error');
    }
};
