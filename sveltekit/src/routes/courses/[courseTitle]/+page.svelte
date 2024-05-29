<script lang="ts">
	import ChapterCard from './ChapterCard.svelte';

	export let data;
</script>

<div class="mx-auto mt-16 max-w-screen-2xl space-y-8 p-4 2xl:p-0">
	<h1 class="text-2xl font-medium">Course Schedule</h1>
	<div class="flex flex-col gap-8">
		{#each data.chapters as chapter}
			{#if chapter.parent === null}
				<ChapterCard
					{chapter}
					subchapters={data.chapters.filter(
						(subchapter) => subchapter.parent?.title === chapter.title
					)}
				/>
			{/if}
		{/each}
	</div>
</div>
