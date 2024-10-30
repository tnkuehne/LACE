import { createDirectus, rest, staticToken } from '@directus/sdk';
import { env } from '$env/dynamic/private';

type FetchFunction = typeof fetch;

// https://docs.directus.io/blog/getting-started-directus-sveltekit.html#create-a-wrapper-for-the-sdk
function getDirectusInstance(fetch: FetchFunction) {
	const options = { globals: { fetch } };
	return createDirectus(`${env.PRIVATE_APIURL ?? 'http://cms:8055'}`, options)
		.with(staticToken(`${env.DIRECTUS_TOKEN}`))
		.with(rest({ credentials: 'include' }));
}

export default getDirectusInstance;
