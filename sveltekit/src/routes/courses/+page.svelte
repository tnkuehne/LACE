<script lang="ts">
	import CourseCard from './CourseCard.svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		if (data.sync === 'succeeded') {
			toast.info('Syncing completed!');
		}
	});
</script>

<div class="bg-blueGray-50 min-h-screen p-4">
	<div class="mx-auto mt-16 max-w-screen-2xl">
		<div class="-mx-2 flex flex-row flex-wrap justify-center space-y-4 md:space-y-0">
			{#each data.courses as course}
				<div class="w-full px-2 md:w-1/3">
					<CourseCard
						{course}
						toast_text={data.settings.Toast_text}
						chapters={data.chapters.filter((chapter) => chapter.kurs.Title === course.Title)}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
