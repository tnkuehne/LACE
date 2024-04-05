<script lang="ts">
    import {onMount} from 'svelte';
    import getDirectusInstance from '$lib/directus';
    import {readItem, readItems} from '@directus/sdk';
    import * as Carousel from '$lib/components/ui/carousel/index.js';

    // Assuming the structure for a slide
    interface Slide {
        id: string;
        image: string; // ID of the image
        Chapter: number;
        imageUrl?: string; // URL of the image, to be fetched
    }

    let slides: Slide[] = [];


    onMount(async () => {
        try {
            // Your initial fetch logic remains the same
            const slidesWithIds = await getDirectusInstance().request(readItems('Slides', {fields: ['*', 'image.*']}));

            // Construct each image URL directly
            const slidesWithImageUrl = slidesWithIds.map(slide => {
                // Assuming `slide.image` contains the unique identifier for the image
                const imageUrl = `http://localhost:8055/assets/${slide.image}`;
                return { ...slide, imageUrl }; // Add the imageUrl to the slide object
            });

            slides = slidesWithImageUrl as Slide[]; // Ensure the result is treated as an array of Slide
        } catch (error) {
            console.error('Failed to fetch slides or images:', error);
        }
    });
</script>

<div class="p-100">
    <Carousel.Root>
        <Carousel.Content>
            {#each slides as slide}
                <Carousel.Item>
                    <img src="{slide.imageUrl}" alt="Slide {slide.Chapter}">
                </Carousel.Item>
            {/each}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
    </Carousel.Root>
</div>


