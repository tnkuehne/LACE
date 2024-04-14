<script lang="ts">
    import {Separator} from "$lib/components/ui/separator";
    import { Progress } from "$lib/components/ui/progress";

    export let data;
</script>

<div class="flex flex-row items-stretch">
    <div class="basis-1/4 p-2">
        <h2 class="text-2xl font-bold">Chapters</h2>
        <Progress value={data.progress} />
        {#if data.chapters.length > 0}
            <ul>
                {#each data.chapters as chapter}
                    <li>
                        <a href={`/courses/${chapter.kurs.Title}/${chapter.title}`} class={chapter.active ? 'font-bold' : ''}>{chapter.title}</a>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>No chapters available for this course.</p>
        {/if}
    </div>
    <!-- Separator with Tailwind CSS for visible styling -->
    <div class="w-px bg-gray-300 mx-4"></div>
    <div class="basis-3/4">
        <slot/>
    </div>
</div>
