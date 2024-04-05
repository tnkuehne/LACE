<script lang="ts">
    export let data;
</script>

{#if data.chapters.length > 0}
    <ul>
        {#each data.chapters as chapter}
            <li>
                <a href={`/courses/${chapter.Course.Title}/chapters/${chapter.Title}`}>{chapter.Title}</a>
            </li>
        {/each}
    </ul>
{:else}
    <p>No chapters available for this course.</p>
{/if}
