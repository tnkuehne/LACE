<script lang="ts">
    import { Progress } from "$lib/components/ui/progress";
    import * as Accordion from "$lib/components/ui/accordion";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";

    export let data;
</script>

<div class="flex min-h-screen">
    <div class="flex flex-col w-1/4 bg-neutral-50 p-6">
        <h2 class="text-2xl font-bold mb-6">{data.chapters[0].kurs.Title}</h2>
        <div class="mb-4">
            <div class="text-xs text-gray-500 mt-2 flex justify-between items-center">
                <span>{data.progress.toFixed(0)}% completed</span>
                <span>39min</span>
            </div>
            <Progress class="bg-gray-200 rounded-full" value={data.progress} />
        </div>

        {#if data.chapters.length > 0}
            <Accordion.Root class="space-y-2">
                {#each data.chapters as chapter, index}
                    {#if chapter.parent === null}
                        <Accordion.Item class="py-2" value="item-{index}">
                            <Accordion.Trigger class="flex items-center justify-between">
                                <Checkbox class="form-checkbox h-4 w-4 text-blue-600" />
                                <Label class="ml-2 text-sm font-medium text-gray-700">
                                    <a href={`/courses/${chapter.kurs.Title}/${chapter.title}`} class="hover:text-blue-500">
                                        {chapter.title}
                                    </a>
                                </Label>
                            </Accordion.Trigger>
                            <Accordion.Content class="mt-2">
                                <div class="pl-6">
                                    {#each data.chapters as subchapter}
                                        {#if subchapter.parent?.title === chapter.title}
                                            <div class="flex items-center my-1">
                                                <Checkbox class="form-checkbox h-4 w-4 text-blue-600" />
                                                <Label class="ml-2 text-sm text-gray-700">
                                                    <a href={`/courses/${subchapter.kurs.Title}/${subchapter.title}`} class="hover:text-blue-500">
                                                        {subchapter.title}
                                                    </a>
                                                </Label>
                                            </div>
                                        {/if}
                                    {/each}
                                </div>
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
