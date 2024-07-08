import { createHmac } from 'crypto';
import { TextEncoder } from 'util';
import getDirectusInstance from '$lib/server/directus';
import { readItem } from '@directus/sdk';

const publicKey = process.env.PUBLIC_KEY; // Securely access the public key

export const load = async ({ fetch, url }) => {
	const directus = getDirectusInstance(fetch);
	const data = url.searchParams.get('data');
	const signature = url.searchParams.get('signature');

	if (!data || !signature) {
		return { status: 400, error: 'Invalid request' };
	}

	const decodedData = atob(decodeURIComponent(data));
	const certificateData = JSON.parse(decodedData);

	const response = await directus.request(readItem('certificates', certificateData.certificateId));

	const storedSignature = response.signature;

	if (!storedSignature) {
		return { status: 404, error: 'Certificate not found' };
	}

	const encoder = new TextEncoder();
	const calculatedSignature = createHmac('sha256', publicKey)
		.update(encoder.encode(decodedData))
		.digest('hex');

	if (calculatedSignature !== signature || storedSignature !== signature) {
		return { status: 401, error: 'Invalid certificate' };
	}

	return { status: 200, certificateData: certificateData };
};
