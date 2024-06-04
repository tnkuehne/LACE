<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { PUBLIC_URL } from '$env/static/public';

	let errorMessage = $page.error.message;
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

	<Card.Root class="relative z-10 p-10 text-center">
		<Card.Header>
			<Card.Title class="text-2xl text-gray-700 dark:text-gray-200">
				{errorMessage}
			</Card.Title>
			<Card.Description class="mt-2 text-gray-500 dark:text-gray-400"
				>The page you are looking for might have been removed, had its name changed, or is
				temporarily unavailable.</Card.Description
			>
		</Card.Header>
		<Card.Footer class="justify-center">
			<Button size="lg" href="/" class="light:text-white">Go to Homepage</Button>
		</Card.Footer>
	</Card.Root>
</div>
