<script lang="ts">
    import Quiz from "./Quiz.svelte";
    import * as Carousel from '$lib/components/ui/carousel/index.js';
    import { Separator } from "$lib/components/ui/separator";
    import type { Question, Slide } from '$lib/types';
    import { progressStore } from '$lib/stores/progressStore';

    export let data;

    $: if (data.chapter && data.chapter.id) {
        progressStore.setProgress(data.chapter.kurs.id, data.chapter.id);
    }
</script>

<div>
    <h1 class="text-4xl font-bold text-center">{data.chapter.title}</h1>
    <Separator />
    <div class="w-4/5 mx-auto">
        {#if data.chapter.content && data.chapter.content.length > 0}
            <Carousel.Root>
                <Carousel.Content class="flex">
                    {#each data.chapter.content as content, index}
                        {#if content.collection === 'folien'}
                            <Carousel.Item>
                                <img src={`http://localhost:8055/assets/${content.item.bild}`} alt={`Slide ${index + 1}`}>
                            </Carousel.Item>
                        {:else if content.collection === 'mcQuiz'}
                            <Carousel.Item class="flex justify-center items-center">
                                <Quiz question={content.item}/>
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
