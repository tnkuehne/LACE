<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { PUBLIC_URL } from '$env/static/public';

	export let data: PageData;
</script>

<div class="relative flex min-h-screen items-center justify-center bg-cover bg-center">
	<div
		class="absolute inset-0 bg-gradient-to-br from-blue-600 from-40% to-purple-700 to-90% opacity-30 dark:from-blue-400 dark:to-purple-300 dark:opacity-40"
	></div>

	<!-- Image Overlay -->
	<img
		src="{PUBLIC_URL}/grainy.png"
		alt="Overlay"
		class="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
	/>

	{#if data.status === 200}
		<Card.Root class="relative z-10">
			<Card.Header>
				<Card.Title>Certificate is valid.</Card.Title>
				<Card.Description>Certificate Verification</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Name: {data.certificateData.userName}</p>
				<p>Course: {data.certificateData.courseName}</p>
				<p>Certificate ID: {data.certificateData.certificateId}</p>
			</Card.Content>
		</Card.Root>
	{:else}
		<Alert.Root variant="destructive" class="relative z-10 w-1/2 bg-white">
			<CircleAlert class="h-4 w-4" />
			<Alert.Title>Verification Error</Alert.Title>
			<Alert.Description>{data.error}</Alert.Description>
		</Alert.Root>
	{/if}
</div>
