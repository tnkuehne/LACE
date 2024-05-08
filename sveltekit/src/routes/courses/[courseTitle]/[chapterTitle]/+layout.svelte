<script lang="ts">
    import { Progress } from "$lib/components/ui/progress";
    import * as Accordion from "$lib/components/ui/accordion";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";
    import {progressStore} from '$lib/stores/progressStore';

    export let data;
</script>

<div class="flex min-h-screen">
    <div class="w-1/4 bg-neutral-50 p-8">
        <h2 class="text-2xl font-bold mb-8">{data.chapters[0].kurs.Title}</h2>
        <h4 class="text-gray-500 mb-4 text-sm font-medium">Your progress</h4>
        <div class="mb-4">
            <div class="text-sm mt-2 font-medium">
                <span>{progressStore.getCourseProgress(data.chapters[0].kurs.id, data.chapters.length).toFixed(0)}% completed</span>
            </div>
            <Progress class="bg-gray-200 rounded-full" value={progressStore.getCourseProgress(data.chapters[0].kurs.id, data.chapters.length)} />
        </div>

        {#if data.chapters.length > 0}
            <Accordion.Root>
                {#each data.chapters as chapter, index}
                    {#if chapter.parent === null}
                        <Accordion.Item value="item-{index}">
                            <Accordion.Trigger>
                                <div class="flex items-center space-x-2">
                                    <Checkbox checked={chapter.active ? "indeterminate" : !!$progressStore[chapter.kurs.id]?.completedChapters.includes(chapter.id)} disabled/>
                                    <Label class="text-sm font-medium">
                                        <a href={`/courses/${chapter.kurs.Title}/${chapter.title}`} class="hover:text-blue-500">
                                            {chapter.title}
                                        </a>
                                    </Label>
                                </div>
                            </Accordion.Trigger>
                            <Accordion.Content class="pt-4">
                                {#each data.chapters as subchapter, subIndex}
                                    {#if subchapter.parent?.title === chapter.title}
                                        <div class="flex items-start space-x-2">
                                            <div class="grid place-items-center">
                                                <Checkbox class="h-4 w-4 text-blue-600" checked={subchapter.active ? "indeterminate" : !!$progressStore[subchapter.kurs.id]?.completedChapters.includes(subchapter.id)} disabled/>
                                                <!-- Add vertical line below checkbox -->
                                                {#if subchapter !== data.chapters.filter(item => item.parent?.title === chapter.title).slice(-1)[0]}
                                                    <div class="my-2 border-l-2 {$progressStore[subchapter.kurs.id]?.completedChapters.includes(subchapter.id) ? 'border-blue-600' : 'border-gray-300'} h-6"></div>
                                                {/if}
                                            </div>
                                            <Label class="text-sm">
                                                <a href={`/courses/${subchapter.kurs.Title}/${subchapter.title}`} class="hover:text-blue-500">
                                                    {subchapter.title}
                                                </a>
                                            </Label>
                                        </div>
                                    {/if}
                                {/each}
                            </Accordion.Content>
                        </Accordion.Item>
                    {/if}
                {/each}
            </Accordion.Root>
        {:else}
            <p class="text-gray-500">No chapters available for this course.</p>
        {/if}
    </div>
    <div class="w-3/4 p-16">
        <slot />
    </div>
</div>
