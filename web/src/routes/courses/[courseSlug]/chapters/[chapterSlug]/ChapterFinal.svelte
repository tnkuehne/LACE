<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { env } from '$env/dynamic/public';

	export let nextChapterUrl = '';
	export let emptyChapter: boolean;

	$: if (nextChapterUrl && emptyChapter) {
		goto(nextChapterUrl);
	}

	function navigateToNextChapter() {
		if (nextChapterUrl) {
			goto(nextChapterUrl);
		} else {
			goto(`${env.PUBLIC_WEB_URL}/courses`); // Navigate to home page or course list
		}
	}
</script>

<Card.Root class="inline-block border-0 shadow-none">
	<Card.Header>
		<Card.Title>
			{#if nextChapterUrl}
				You made it to the end!
			{:else}
				Congratulations, you've completed all chapters!
			{/if}
		</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if nextChapterUrl}
			The next chapter is waiting for you. Keep going!
		{:else}
			You've completed all chapters. You can review the course or start a new one.
		{/if}
	</Card.Content>
	<Card.Footer>
		<Button on:click={navigateToNextChapter}>
			{#if nextChapterUrl}
				Next
			{:else}
				Back to Courses
			{/if}
		</Button>
	</Card.Footer>
</Card.Root>
