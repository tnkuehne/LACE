import { createDirectus, rest, staticToken } from '@directus/sdk';
import { env } from '$env/dynamic/private';

type FetchFunction = typeof fetch;

function getDirectusInstance(fetch: FetchFunction) {
	const options = { globals: { fetch } };
	return createDirectus(`${env.PRIVATE_APIURL ?? 'http://cms:8055'}`, options)
		.with(staticToken(`${env.DIRECTUS_TOKEN}`))
		.with(rest({ credentials: 'include' }));
}

export default getDirectusInstance;
