import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

function extractBrowserName(userAgent: string): string {
	const browserRegex =
		/(firefox|msie|trident|chrome|safari|opera|edg|opr|vivaldi|brave|whale|kakao|ucbrowser|qqbrowser|baidu|maxthon|seamonkey|palemoon|lunascape|qutebrowser|otter|midori|epiphany|surf|netsurf|uzbl|conkeror|luakit|dooble|falkon|netscape|k-meleon|phoenix|galeon|epic|beonex|camino|chimera|fennec|flock|icab|iron|maxthon|omniweb|slimjet|vivaldi|yabrowser|iceweasel|icecat|ucbrowser|skyfire|bolt|dillo|lynx|links|w3m|elinks|amaya|netsurf|seamonkey|iceweasel|icecat|konqueror|puffin|qupzilla|rekonq|rockmelt|sleipnir|sogou|ucbrowser|yabrowser|fennec|camino|chimera|icecat|iceweasel|dolphin|phoenix|brave|comodo|duckduckgo|epic|k-meleon|lunascape|netscape|otter|rekonq|seamonkey|silk|sogou|tor|yandex)/i;
	const match = userAgent.match(browserRegex);
	return match ? match[1] : 'unknown';
}

function extractOS(userAgent: string): string {
	const osRegex =
		/(windows nt|macintosh|linux|android|iphone|ipad|ipod|blackberry|bb10|symbian|series60|webos|kindle|silk|playbook|tizen|sailfish|kaios|chromium os|cros|ubuntu|fedora|debian|opensuse|red hat|centos|arch linux|gentoo|manjaro|slackware|mageia|mint|elementary os|zorin os|deepin|cloudready|chrome os)/i;
	const match = userAgent.match(osRegex);
	return match ? match[1] : 'unknown';
}

function extractDeviceType(userAgent: string): string {
	if (/mobile/i.test(userAgent)) {
		return 'Mobile';
	} else if (/tablet/i.test(userAgent)) {
		return 'Tablet';
	} else {
		return 'Desktop';
	}
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const directus = getDirectusInstance(fetch);

	const { path, referrer } = await request.json();
	let ip = getClientAddress();

	// Strip the "::ffff:" prefix if present
	if (ip.startsWith('::ffff:')) {
		ip = ip.replace('::ffff:', '');
	}

	const userAgent = request.headers.get('user-agent') || '';
	const browserName = extractBrowserName(userAgent);
	const osName = extractOS(userAgent);
	const deviceType = extractDeviceType(userAgent);

	await directus.request(
		createItem('page_views', {
			path,
			referrer,
			ip,
			browser: browserName,
			os: osName,
			device: deviceType
		})
	);

	return json({ success: true });
};
