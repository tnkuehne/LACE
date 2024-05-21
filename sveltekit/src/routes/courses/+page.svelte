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
		<div class="-mx-2 flex flex-row flex-wrap justify-center">
			{#each data.courses as course}
				<div class="w-full px-2 sm:w-1/2 lg:w-1/3">
					<CourseCard
						{course}
						chapters={data.chapters.filter((chapter) => chapter.kurs.Title === course.Title)}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
