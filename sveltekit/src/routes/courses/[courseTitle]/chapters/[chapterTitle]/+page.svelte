<script lang="ts">

    export let data;
    import * as Carousel from '$lib/components/ui/carousel/index.js';
    import {Separator} from "$lib/components/ui/separator";
    import { onMount } from 'svelte';

    onMount(() => {
        localStorage.setItem('lastVisitedChapter', data.slides[0].Chapter.Title);
    });
</script>

<div class="flex flex-col items-center">
    <h1 class="text-4xl font-bold">{data.slides[0].Chapter.Title}</h1>
    <Separator />
    <div class="w-4/5 mx-auto">
        {#if data.slides.length > 0}
            <div class="p-100">
                <Carousel.Root>
                    <Carousel.Content>
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