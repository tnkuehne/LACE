<script lang="ts">
	import ChapterCard from './ChapterCard.svelte';
	import { env } from '$env/dynamic/public';

	export let data;

	$: jsonLd = JSON.stringify({
		"@context": "https://schema.org",
		"@id": `${env.PUBLIC_URL}/courses/${data.chapters[0].kurs.slug}`,
		"@type": "Course",
		"name": data.chapters[0].kurs.Title,
		"description": data.chapters[0].kurs.Description,
		"provider": {
			"@type": "Organization",
			"name": "Chair for Software Engineering for Business Information Systems",
			"sameAs": "https://wwwmatthes.in.tum.de"
		},
		"image": [
			`${env.PUBLIC_URL}/cms/assets/${data.chapters[0].kurs.Image}`
		],
		"inLanguage": "en",
		"datePublished": "2024-09-20",
		"educationalCredentialAwarded": [{
			"@type": "EducationalOccupationalCredential",
			"name": "LACE Certificate",
			"url": `${env.PUBLIC_URL}`,
			"credentialCategory": "Certificate",
		}],
	});
</script>

<svelte:head>
	<title>{data.chapters[0].kurs.Title}</title>
	<meta name="description" content={data.chapters[0].kurs.Description} />
	<meta property="og:title" content={data.chapters[0].kurs.Title} />
	<meta
		name="image"
		property="og:image"
		content={`${env.PUBLIC_URL}/cms/assets/${data.chapters[0].kurs.Image}`}
	/>
	<meta property="og:description" content={data.chapters[0].kurs.Description} />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<div class="mx-auto mt-16 max-w-screen-2xl space-y-8 p-4 2xl:p-0">
	<h1 class="text-2xl font-medium">{data.settings.title}</h1>
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
