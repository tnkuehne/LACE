<script>
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	async function trackPageView(path, referrer) {
		await fetch('/api/analytics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ path, referrer })
		});
	}

	onMount(() => {
		const referrer = document.referrer;
		const path = $page.url.href;

		// For testing purposes
		trackPageView(path, referrer);

		// Only track if referrer is different from the current hostname
		if (referrer && new URL(referrer).hostname !== $page.url.hostname) {
			trackPageView(path, referrer);
		}
	});
</script>

<Toaster />
<ModeWatcher />
<slot />
