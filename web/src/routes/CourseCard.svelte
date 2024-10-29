<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/index.js';
	import { env } from '$env/dynamic/public';

	export let title: string;
	export let slug: string;
	export let description: string;
	export let buttonText: string;
	export let color: string;
	export let Icon;

	let rgbaColor = hexToRGBA(color, 0.2);

	// needed because the color selector in the CMS returns a hex value
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

<Card.Root
	class="light:border-teal-50 light:shadow-[34.854px_29.626px_48.34px_0px_rgba(51,102,255,0.05)] flex h-full flex-col items-center justify-center rounded-2xl border"
>
	<Card.Header>
		<Card.Title>
			<div
				class="flex h-16 w-16 items-center justify-center rounded-lg"
				style="background-color: {rgbaColor};"
			>
				<Icon class="h-6 w-6" style="stroke: {color};" />
			</div>
		</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-grow flex-col items-center justify-center space-y-4 text-center">
		<a class="text-3xl font-bold" href={`${env.PUBLIC_WEB_URL}/courses/${slug}`}>{title}</a>
		<p class="text-sm text-gray-500">
			{description}
		</p>
	</Card.Content>
	<Card.Footer class="mt-auto">
		<Button variant="link" href={`${env.PUBLIC_WEB_URL}/courses/${slug}`}>{buttonText}</Button>
	</Card.Footer>
</Card.Root>
