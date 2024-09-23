<script lang="ts">
	import CourseCard from './CourseCard.svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import SEO from "$lib/components/SEO.svelte";
	import {env} from "$env/dynamic/public";

	export let data;

	onMount(() => {
		if (data.sync === 'succeeded') {
			toast.info('Syncing completed!');
		}
	});

	$: jsonLd = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "ItemList",
		"itemListElement": data.courses.map((course, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"url": `${env.PUBLIC_URL}/courses/${course.slug}`
		}))
	});
</script>

<SEO seo={data.settings.seo} defaultTitle="Courses" defaultDescription="Learn about Privacy Enhancing Technology"/>

<svelte:head>
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<div class="min-h-screen p-4">
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
