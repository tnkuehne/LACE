<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as icons from 'lucide-svelte';

	export let title: string;
	export let description: string;
	export let buttonText: string;
	export let icon: string;
	export let color: string;

	let rgbaColor = hexToRGBA(color, 0.2);

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
</script>

<Card.Root class="flex h-full flex-col items-center justify-center">
	<Card.Header>
		<Card.Title>
			<div
				class="flex h-16 w-16 items-center justify-center rounded-lg"
				style="background-color: {rgbaColor};"
			>
				<svelte:component
					this={icons[icon]}
					{...$$props}
					class="h-6 w-6"
					style="stroke: {color};"
				/>
			</div>
		</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-grow flex-col items-center justify-center text-center space-y-4">
		<p class="text-3xl font-bold text-black">{title}</p>
		<p class="text-gray-500">
			{description}
		</p>
	</Card.Content>
	<Card.Footer class="mt-auto">
		<Button variant="link">{buttonText}</Button>
	</Card.Footer>
</Card.Root>
