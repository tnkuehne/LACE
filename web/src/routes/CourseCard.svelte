<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/index.js';
	import ScrollText from 'lucide-svelte/icons/scroll-text'; // Import the placeholder icon
	import { onMount } from 'svelte';

	export let title: string;
	export let slug: string;
	export let description: string;
	export let buttonText: string;
	export let icon: string;
	export let color: string;

	let rgbaColor = hexToRGBA(color, 0.2);
	let IconComponent = ScrollText; // Use ScrollText as the initial icon

	function hexToRGBA(hex: string, alpha: number) {
		let r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		if (alpha) {
			return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
		} else {
			return 'rgb(' + r + ', ' + g + ', ' + b + ')';
		}
	}

	// Lazy load the desired icon when the component is mounted
	onMount(async () => {
		try {
			const icons = await import('lucide-svelte');
			if (icons[icon]) {
				IconComponent = icons[icon];
			}
		} catch (error) {
			console.error('Error loading icon:', error);
		}
	});
</script>

<Card.Root
	class="light:border-teal-50 light:shadow-2xl flex h-full flex-col items-center justify-center rounded-2xl shadow-indigo-500/10"
>
	<Card.Header>
		<Card.Title>
			<div
				class="flex h-16 w-16 items-center justify-center rounded-lg"
				style="background-color: {rgbaColor};"
			>
				<svelte:component
					this={IconComponent}
					{...$$props}
					class="h-6 w-6"
					style="stroke: {color};"
				/>
			</div>
		</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-grow flex-col items-center justify-center space-y-4 text-center">
		<a class="text-3xl font-bold" href="/courses/{slug}">{title}</a>
		<p class="text-sm text-gray-500">
			{description}
		</p>
	</Card.Content>
	<Card.Footer class="mt-auto">
		<Button variant="link" href="/courses/{slug}">{buttonText}</Button>
	</Card.Footer>
</Card.Root>
