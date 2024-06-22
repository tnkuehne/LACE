<script>
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { progressStore } from '$lib/stores/progressStore';
	import { browser } from '$app/environment';

	export let data;

	if (browser) {
		window.onerror = function (message, source, lineno, colno, error) {
			fetch('/api/analytics/error', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message, stack: source, error })
			});
		};
		window.onunhandledrejection = function (event) {
			fetch('/api/analytics/error', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ event, message: event.reason.message, stack: event.reason.stack })
			});
		};
	}

	async function trackPageView(path, referrer) {
		await fetch('/api/analytics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ path, referrer })
		});
	}

	if (browser) {
		progressStore.initializeStore();
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
{#if data.previewMode}
	<div class="fixed bottom-0 right-0 z-20 w-full bg-black py-2 text-center text-white">
		You are viewing the site in draft mode, <a href="/api/exit-preview" class="underline"
			>click here exit.</a
		>
	</div>
{/if}
<slot />
