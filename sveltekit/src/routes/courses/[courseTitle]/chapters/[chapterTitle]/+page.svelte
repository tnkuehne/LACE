<script lang="ts">

    import Quiz from "./Quiz.svelte";
    import * as Carousel from '$lib/components/ui/carousel/index.js';
    import {Separator} from "$lib/components/ui/separator";
    import type {Question, Slide} from '$lib/types';
    import { progressStore } from '$lib/stores/progressStore';


    interface Data {
        slides: Slide[];
        quizzes: Question[]; // Ensure this is always expected to be an array
    }

    export let data: Data;

    $: if (data.slides.length > 0) {
        progressStore.setProgress(data.slides[0].Chapter.Title);
    }

</script>

<div>
    <h1 class="text-4xl font-bold text-center">{data.slides[0].Chapter.Title}</h1>
    <Separator/>
    <div class="w-4/5 mx-auto">
        {#if data.slides.length > 0}
            <Carousel.Root>
                <Carousel.Content class="flex">
                    {#each data.slides as slide}
                        <Carousel.Item>
                            <img src={`http://localhost:8055/assets/${slide.image}`} alt="Slide {slide.Chapter}">
                        </Carousel.Item>
                    {/each}
                    {#each data.quizzes as quiz}
                        <Carousel.Item  class="flex justify-center items-center">
                            <Quiz question={quiz}/>
                        </Carousel.Item>
                    {/each}
                </Carousel.Content>
                <Carousel.Previous/>
                <Carousel.Next/>
            </Carousel.Root>
        {:else}
            <p>No slides available for this chapter.</p>
        {/if}
    </div>
</div>