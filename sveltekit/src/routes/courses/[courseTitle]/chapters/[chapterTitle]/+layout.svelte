<script lang="ts">
    export let data;
</script>

<div class="flex flex-row">
    <div class="basis-1/4">
        <h2 class="text-2xl font-bold">Chapters</h2>
        {#if data.chapters.length > 0}
            <ul>
                {#each data.chapters as chapter}
                    {#if chapter.active}
                        <li>
                            <a href={`/courses/${chapter.Course.Title}/chapters/${chapter.Title}`} class="font-bold">{chapter.Title}</a>
                        </li>
                    {:else}
                        <li>
                            <a href={`/courses/${chapter.Course.Title}/chapters/${chapter.Title}`}>{chapter.Title}</a>
                        </li>
                    {/if}
                {/each}
            </ul>
        {:else}
            <p>No chapters available for this course.</p>
        {/if}
    </div>
    <div class="basis-3/4">
        <slot/>
    </div>
</div>