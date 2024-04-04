import {createDirectus, rest} from '@directus/sdk';

// Accessing the environment variable
const PUBLIC_APIURL = import.meta.env.VITE_PUBLIC_APIURL;

type FetchFunction = typeof fetch;

function getDirectusInstance(fetch?: FetchFunction) {
    const options = fetch ? { globals: { fetch } } : {};
    return createDirectus('http://localhost:8055/', options).with(rest());
}

export default getDirectusInstance;
