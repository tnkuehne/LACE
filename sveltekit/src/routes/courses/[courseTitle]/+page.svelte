<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import {Button} from "$lib/components/ui/button";
    import { progressStore} from "$lib/stores/progressStore";

    export let data;

    $: lastVisitedChapter = $progressStore;
</script>

<h1 class="text-2xl font-bold text-center">Chapters</h1>
{#if data.chapters.length > 0}
    <div class="flex flex-col gap-4 p-4">
        {#each data.chapters as chapter}
            <Card.Root class={chapter.Title === lastVisitedChapter ? 'border-2 border-blue-500' : ''}>
                <Card.Header>
                    <Card.Title>{chapter.Title}</Card.Title>
                    <Card.Description>{chapter.Description}</Card.Description>
                </Card.Header>
                <Card.Footer>
                    {#if lastVisitedChapter === chapter.Title}
                        <Button href={`/courses/${chapter.Course.Title}/chapters/${chapter.Title}`}
                                class={chapter.Title === lastVisitedChapter ? 'font-bold' : ''}>Resume
                        </Button>
                    {:else}
                        <Button href={`/courses/${chapter.Course.Title}/chapters/${chapter.Title}`}
                                class={chapter.Title === lastVisitedChapter ? 'font-bold' : ''}>Start
                        </Button>
                    {/if}
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
{:else}
    <p>No chapters available for this course.</p>
{/if}
