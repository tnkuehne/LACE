<script lang="ts">
	import CourseCard from './CourseCard.svelte';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import { Button } from '$lib/components/ui/button';

	export let data;
</script>

<div class="bg-blueGray-50 min-h-screen p-4">
	<div class="mx-auto mt-32 max-w-screen-2xl space-y-8">
		<div class="flex flex-row space-x-4">
			<Button variant="outline" size="icon" href="/">
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<h2 class="text-2xl font-bold">{data.settings.title}</h2>
		</div>
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
