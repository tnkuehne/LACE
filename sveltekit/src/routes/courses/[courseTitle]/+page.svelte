<script lang="ts">
    import { progressStore } from '$lib/stores/progressStore';
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";

    export let data;

    let lastVisitedChapter = '';

    // Using a reactive statement to watch changes in data.courseId
    $: {
        if(data.chapters.length > 0) {
            const progress = progressStore.getProgress(data.chapters[0].kurs.id);
            lastVisitedChapter = progress ? progress.lastVisitedChapter : '';
        }
    }
</script>

<h1 class="text-2xl font-bold text-center">Chapters</h1>
{#if data.chapters.length > 0}
    <div class="flex flex-col gap-4 p-4">
        {#each data.chapters as chapter}
            <Card.Root class={chapter.id === lastVisitedChapter ? 'border-2 border-blue-500' : ''}>
                <Card.Header>
                    <Card.Title>{chapter.title}</Card.Title>
                    <Card.Description>{chapter.Description}</Card.Description>
                </Card.Header>
                <Card.Footer>
                    <Button href={`/courses/${chapter.kurs.Title}/${chapter.title}`}
                            class={chapter.Title === lastVisitedChapter ? 'font-bold' : ''}>
                        {lastVisitedChapter === chapter.Title ? 'Resume' : 'Start'}
                    </Button>
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
{:else}
    <p>No chapters available for this course.</p>
{/if}
