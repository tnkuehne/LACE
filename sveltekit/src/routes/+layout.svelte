<script>
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { createItem } from '@directus/sdk';
	import getDirectusInstance from '$lib/directus';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const directus = getDirectusInstance(fetch);

	function ipv4ToInt(ip) {
		return ip.split('.').reduce((acc, part) => (acc << 8) + parseInt(part, 10), 0);
	}

	async function trackPageView(path, referrer, ip) {
		// Convert IP to integer
		const ipInt = ipv4ToInt(ip);

		await directus.request(
			createItem('page_views', {
				path,
				referrer,
				ip_int: ipInt
			})
		);
	}

	onMount(() => {
		const referrer = document.referrer;
		const path = $page.url.href;

		// For testing purposes
		const ip = '84.186.241.228';
		trackPageView(path, referrer, ip);

		// Only track if referrer is different from the current hostname
		if (referrer && new URL(referrer).hostname !== $page.url.hostname) {
			trackPageView(path, referrer, ip);
		}
	});
</script>

<Toaster />
<ModeWatcher />
<slot />
