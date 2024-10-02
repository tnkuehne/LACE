<script lang="ts">
	import McQuiz from './McQuiz.svelte';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import * as Carousel from '$lib/components/ui/carousel';
	import { Separator } from '$lib/components/ui/separator';
	import { progressStore } from '$lib/stores/progressStore';
	import OrderQuiz from './OrderQuiz.svelte';
	import ChapterFinal from './ChapterFinal.svelte';
	import { env } from '$env/dynamic/public';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import Maximize from 'lucide-svelte/icons/maximize';
	import Minimize from 'lucide-svelte/icons/minimize';
	import { isFullScreen } from '$lib/stores/fullScreen';
	import References from './References.svelte';

	export let data;

	let api: CarouselAPI;
	let count = 0;
	let current = 0;
	let nextChapterUrl = '';

	$: chapter = data.chapter[0];

	$: if (api && data) {
		api.scrollTo(0); // Scroll to the first slide
		const currentChapterIndex = data.chapters.findIndex((_chapter) => _chapter.id === chapter.id);
		if (currentChapterIndex !== -1 && currentChapterIndex < data.chapters.length - 1) {
			const nextChapter = data.chapters[currentChapterIndex + 1];
			nextChapterUrl = `/courses/${chapter.kurs.slug}/chapters/${nextChapter.slug}`;
		} else {
			nextChapterUrl = '';
		}
	}

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;
		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
			console.log('slide: ', current, '/', count);
		});
	}

	// Check if the current slide is the last one
	$: if (current === count && current > 0) {
		progressStore.completeChapter(chapter.kurs.id, chapter.id);
		toast.success('Progress saved!');
		console.log('Chapter completed');
	}

	function toggleFullScreen() {
		isFullScreen.update((value) => !value);
	}

	function chunkReferences(references, chunkSize = 7) {
		const chunks = [];
		for (let i = 0; i < references.length; i += chunkSize) {
			chunks.push(references.slice(i, i + chunkSize));
		}
		return chunks;
	}
</script>

<svelte:head>
	<title>{chapter.title}</title>
	<meta name="description" content={chapter.description} />
</svelte:head>

<div>
	<div class="space-y-2">
		{#if chapter.parent}
			<span class="text-sm font-medium text-sky-800 dark:text-sky-600">{chapter.parent.title}</span>
		{/if}
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold">{chapter.title}</h1>
			<Button
				variant="outline"
				size="icon"
				on:click={toggleFullScreen}
				class="invisible lg:visible"
			>
				{#if $isFullScreen}
					<Minimize class="h-4 w-4" />
				{:else}
					<Maximize class="h-4 w-4" />
				{/if}
			</Button>
		</div>
		<Separator />
	</div>
	<div class="mx-auto w-5/6 pt-16">
		<Carousel.Root
			bind:api
			opts={{
				watchDrag: false
			}}
		>
			<Carousel.Content class="flex">
				{#each chapter.content as content, index}
					{#if content.item && 'type' in content.item}
						{#if content.item.type === 'mc'}
							<Carousel.Item class="flex items-center justify-center">
								<McQuiz
									id={content.item.id}
									question={content.item.question}
									answers={content.item.answers}
								/>
							</Carousel.Item>
						{:else if content.item.type === 'order'}
							<Carousel.Item class="flex items-center justify-center">
								<OrderQuiz
									id={content.item.id}
									question={content.item.question}
									answers={content.item.answers}
								/>
							</Carousel.Item>
						{/if}
					{/if}
					{#if content.collection === 'directus_files'}
						<Carousel.Item>
							<img
								src={`${env.PUBLIC_WEB_URL}/cms/assets/${content.item.id}?format=webp`}
								alt={`Slide ${index + 1}`}
								loading="lazy"
							/>
						</Carousel.Item>
					{/if}
				{/each}
				{#if chapter.references}
					{#each chunkReferences(chapter.references) as referenceChunk}
						<Carousel.Item class="flex items-center justify-center">
							<References references={referenceChunk} />
						</Carousel.Item>
					{/each}
				{/if}
				<Carousel.Item class="flex items-center justify-center">
					<ChapterFinal {nextChapterUrl} emptyChapter={chapter.content.length === 0} />
				</Carousel.Item>
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</div>
