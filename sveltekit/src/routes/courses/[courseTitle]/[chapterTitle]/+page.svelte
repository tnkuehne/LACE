<script lang="ts">
    import McQuiz from "./McQuiz.svelte";
    import * as Carousel from '$lib/components/ui/carousel/index.js';
    import {Separator} from "$lib/components/ui/separator";
    import type {Question, Slide} from '$lib/types';
    import {progressStore} from '$lib/stores/progressStore';
    import OrderQuiz from "./OrderQuiz.svelte";

    export let data;

    $: if (data.chapter && data.chapter.id) {
        progressStore.setProgress(data.chapter.kurs.id, data.chapter.id);
    }
</script>

<div>
    <h1 class="text-4xl font-bold text-center">{data.chapter.title}</h1>
    <Separator/>
    <div class="w-4/5 mx-auto">
        {#if data.chapter.content && data.chapter.content.length > 0}
            <Carousel.Root
                    opts={{
                        watchDrag: false,
                      }}
            >
                <Carousel.Content class="flex">
                    {#each data.chapter.content as content, index}
                        {#if content.collection === 'folien'}
                            <Carousel.Item>
                                <img src={`http://localhost:8055/assets/${content.item.bild}`}
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
                </Carousel.Content>
                <Carousel.Previous/>
                <Carousel.Next/>
            </Carousel.Root>
        {:else}
            <p>No slides or quizzes available for this chapter.</p>
        {/if}
    </div>
</div>
