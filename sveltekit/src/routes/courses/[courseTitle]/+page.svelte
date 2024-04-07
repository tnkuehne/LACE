<script lang="ts">
    import { onMount } from 'svelte';

    let lastVisitedChapter: String | null = null;

    onMount(() => {
        lastVisitedChapter = localStorage.getItem('lastVisitedChapter');
    });
    export let data;
</script>

{#if data.chapters.length > 0}
    <ul>
        {#each data.chapters as chapter}
            <li>
                <a href={`/courses/${chapter.Course.Title}/chapters/${chapter.Title}`} class={chapter.Title === lastVisitedChapter ? 'font-bold' : ''}>{chapter.Title}</a>
            </li>
        {/each}
    </ul>
{:else}
    <p>No chapters available for this course.</p>
{/if}
