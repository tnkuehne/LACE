<script>
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';

	let errorMessage = $page.error.message;
</script>

<div class="relative flex min-h-screen items-center justify-center bg-cover bg-center">
	<Card.Root class="relative z-10 p-10 text-center">
		<Card.Header>
			<Card.Title class="text-2xl text-gray-700 dark:text-gray-200">
				{errorMessage}
			</Card.Title>
			<Card.Description class="mt-2 text-gray-500 dark:text-gray-400"
				>The chapter you are looking for might have been removed, had its name changed, or is
				temporarily unavailable.</Card.Description
			>
		</Card.Header>
	</Card.Root>
</div>
