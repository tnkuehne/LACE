<script lang="ts">
    import McQuiz from "./McQuiz.svelte";
    import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
    import * as Carousel from '$lib/components/ui/carousel/index.js';
    import {Separator} from "$lib/components/ui/separator";
    import {Button} from "$lib/components/ui/button";
    import type {Question, Slide} from '$lib/types';
    import {progressStore} from '$lib/stores/progressStore';
    import OrderQuiz from "./OrderQuiz.svelte";
    import ChapterFinal from "./ChapterFinal.svelte";

    export let data;

    let api: CarouselAPI;
    let count = 0;
    let current = 0;
    let nextChapterUrl = '';

    $: if (api && data) {
        api.scrollTo(0); // Scroll to the first slide
        const currentChapterIndex = data.chapters.findIndex(chapter => chapter.id === data.chapter.id);
        console.log("Chapter: ", currentChapterIndex, "/", data.chapters.length - 1)
        if (currentChapterIndex !== -1 && currentChapterIndex < data.chapters.length - 1) {
            const nextChapter = data.chapters[currentChapterIndex + 1];
            nextChapterUrl = `/courses/${data.chapter.kurs.Title}/${nextChapter.title}`;
        } else {
            nextChapterUrl = "";
        }
        console.log(nextChapterUrl);
    }

    $: if (api) {
        count = api.scrollSnapList().length;
        current = api.selectedScrollSnap() + 1;
        api.on("select", () => {
            current = api.selectedScrollSnap() + 1;
            console.log("slide: ", current, "/", count);
        });
    }

    // Check if the current slide is the last one
    $: if (current === count && current > 0) {
        progressStore.completeChapter(data.chapter.kurs.id, data.chapter.id);
        console.log("Chapter completed");
    }
</script>

<div>
    <div class="space-y-2">
        {#if data.chapter.parent}
            <span class="text-sm font-medium text-blue-500">{data.chapter.parent.title}</span>
        {/if}
        <h1 class="text-2xl font-medium">{data.chapter.title}</h1>
        <Separator/>
    </div>
    <div class="w-5/6 mx-auto pt-16">
        <Carousel.Root
                bind:api
                opts={{
                        watchDrag: false,
                      }}
        >
            <Carousel.Content class="flex">
                {#each data.chapter.content as content, index}
                    {#if content.collection === 'folien'}
                        <Carousel.Item>
                            <img src={`api/assets/${content.item.bild}`}
                                 alt={`Slide ${index + 1}`}>
                        </Carousel.Item>
                    {:else if content.collection === 'mcQuiz'}
                        <Carousel.Item class="flex justify-center items-center">
                            <McQuiz question={content.item.question} answers={content.item.answers}/>
                        </Carousel.Item>
                    {:else if content.collection === 'orderQuiz'}
                        <Carousel.Item class="flex justify-center items-center">
                            <OrderQuiz question={content.item.question} answers={content.item.answers}/>
                        </Carousel.Item>
                    {/if}
                {/each}
                <Carousel.Item class="flex justify-center items-center">
                    <ChapterFinal {nextChapterUrl}/>
                </Carousel.Item>
            </Carousel.Content>
            <Carousel.Previous/>
            <Carousel.Next/>
        </Carousel.Root>
    </div>
</div>
