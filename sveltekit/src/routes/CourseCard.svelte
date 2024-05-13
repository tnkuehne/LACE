<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as icons from 'lucide-svelte';

	export let title: string;
	export let description: string;
	export let buttonText: string;
	export let icon: string;
</script>

<Card.Root class="flex h-full flex-col items-center justify-center">
	<Card.Header>
		<Card.Title>
			<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-200">
				<svelte:component this={icons[icon]} {...$$props} class="h-6 w-6 stroke-orange-500" />
			</div>
		</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-grow flex-col items-center justify-center">
		<Card.Description class="text-3xl font-bold text-black">{title}</Card.Description>
		<p class="text-gray-500">
			{description}
		</p>
	</Card.Content>
	<Card.Footer class="mt-auto">
		<Button variant="link">{buttonText}</Button>
	</Card.Footer>
</Card.Root>
