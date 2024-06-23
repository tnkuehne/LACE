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
			nextChapterUrl = `/courses/${chapter.kurs.slug}/${nextChapter.slug}`;
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
</script>

<div>
	<div class="space-y-2">
		{#if chapter.parent}
			<span class="text-sm font-medium text-blue-500">{chapter.parent.title}</span>
		{/if}
		<h1 class="text-2xl font-medium">{chapter.title}</h1>
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
					{#if content.collection === 'folien'}
						<Carousel.Item>
							<img
								src={`${env.PUBLIC_APIURL}/assets/${content.item.bild}?format=webp`}
								alt={`Slide ${index + 1}`}
								loading="lazy"
							/>
						</Carousel.Item>
					{:else if content.item.type === 'mc'}
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
				{/each}
				<Carousel.Item class="flex items-center justify-center">
					<ChapterFinal {nextChapterUrl} />
				</Carousel.Item>
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</div>
