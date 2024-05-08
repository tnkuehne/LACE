import {createDirectus, rest} from '@directus/sdk';
import { env } from '$env/dynamic/public';

type FetchFunction = typeof fetch;

function getDirectusInstance(fetch?: FetchFunction) {
    const options = fetch ? { globals: { fetch } } : {};
    return createDirectus(`${env.PUBLIC_APIURL}`, options).with(rest({ credentials: 'include' }));
}

export default getDirectusInstance;
