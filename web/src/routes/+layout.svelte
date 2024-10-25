<script>
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { logError } from '$lib/logError';

	import { progressStore } from '$lib/stores/progressStore';
	import { browser } from '$app/environment';

	export let data;

	if (browser) {
		window.onerror = function (message, source, lineno, colno, error) {
			logError(error, error?.stack, 500, message, source);
		};
		window.onunhandledrejection = function (event) {
			logError(event, event.reason.stack, 500, event.reason.message, event.reason.stack);
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
		const path = $page.url.pathname;

		if (!referrer || new URL(referrer).hostname !== new URL(location.href).hostname) {
			trackPageView(path, referrer);
		}
	});
</script>

<Toaster />
<ModeWatcher />
{#if data.previewMode}
	<div class="fixed bottom-0 right-0 z-20 w-full bg-black py-2 text-center text-white">
		You are viewing the site in draft mode, <a
			href={`${env.PUBLIC_WEB_URL}/api/exit-preview`}
			class="underline">click here exit.</a
		>
	</div>
{/if}
<slot />
