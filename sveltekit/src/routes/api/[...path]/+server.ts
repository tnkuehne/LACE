import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, url }) => {
    // Construct the URL directly using params.path and url.search
    const apiUrl = `http://localhost:8055/${params.path}${url.search}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            // Throw an HTTP error with the status code and message from the API response
            throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        // Return the data as a JSON response
        return new Response(JSON.stringify(data), {
            status: 200, // You can mirror the API's status or use 200 if it's simpler
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        // Handle errors, possibly network errors or the fetch itself failing
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
