<script lang="ts">

    import Quiz from "./Quiz.svelte";

    export let data;
    import * as Carousel from '$lib/components/ui/carousel/index.js';
    import {Separator} from "$lib/components/ui/separator";
    import { onMount } from 'svelte';

    onMount(() => {
        localStorage.setItem('lastVisitedChapter', data.slides[0].Chapter.Title);
    });
    let questions = [
        {
            question: "What is the primary goal of a Zero-Knowledge Proof (ZKP)?",
            answers: [
                {text: "To allow a party to prove possession of a certain information without revealing the information itself."},
                {text: "To encrypt data for secure transmission over public networks."},
                {text: "To increase the efficiency of blockchain transactions by reducing their size."},
                {text: "To authenticate users without the need for passwords."},
            ],
            correct: [0] // This is an array of indices of the correct answers
        },
        // Include additional questions as needed
    ];
</script>

<div class="flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold">{data.slides[0].Chapter.Title}</h1>
    <Separator />
    <div class="w-4/5 mx-auto">
        {#if data.slides.length > 0}
            <div class="p-100">
                <Carousel.Root>
                    <Carousel.Content class="items-center">
                    <Carousel.Item>
                            <Quiz {questions} />
                    </Carousel.Item>
                        {#each data.slides as slide}
                            <Carousel.Item>
                                <img src={`http://localhost:8055/assets/${slide.image}`} alt="Slide {slide.Chapter}">
                            </Carousel.Item>
                        {/each}
                    </Carousel.Content>
                    <Carousel.Previous />
                    <Carousel.Next />
                </Carousel.Root>
            </div>
        {:else}
            <p>No slides available for this chapter.</p>
        {/if}
    </div>
</div>