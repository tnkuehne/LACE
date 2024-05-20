<script lang="ts">
	import CourseCard from './CourseCard.svelte';

	export let data;
</script>

<div class="bg-blueGray-50 min-h-screen">
	<div class="mx-auto max-w-screen-2xl">
		<h1
			class="md:text-6x font-sansation text-4xl font-bold uppercase lining-nums tabular-nums leading-none tracking-[0.12em] text-blue-800"
		>
			LACE
		</h1>
		<h2 class="text-2xl font-bold">My Courses</h2>
		<div class="flex flex-row flex-wrap place-content-center gap-4">
			{#each data.courses as course}
				<CourseCard
					{course}
					chapters={data.chapters.filter((chapter) => chapter.kurs.Title === course.Title)}
				/>
			{/each}
		</div>
	</div>
</div>
