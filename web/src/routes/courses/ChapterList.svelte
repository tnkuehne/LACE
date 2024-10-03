<script lang="ts">
    import { Checkbox } from '$lib/components/ui/checkbox';
    import { Label } from '$lib/components/ui/label';
    import * as Accordion from '$lib/components/ui/accordion';
    import { progressStore } from '$lib/stores/progressStore';
    import { env } from '$env/dynamic/public';

    export let chapters;
    export let courseId;
    export let currentChapterTitle = '';
    export let isPageComponent = false;

    function hasChildren(chapterTitle: string) {
        return chapters.some((c) => c.parent?.title === chapterTitle);
    }

    $: progress = $progressStore[courseId]?.completed_chapters || [];
</script>

<Accordion.Root>
    {#each chapters as chapter, index}
        {#if chapter.parent === null}
            {#if hasChildren(chapter.title)}
                <Accordion.Item value="item-{index}">
                    <Accordion.Trigger>
                        <div class="flex items-center space-x-2">
                            <Label class="text-sm font-medium">
                                {chapter.title}
                            </Label>
                        </div>
                    </Accordion.Trigger>
                    <Accordion.Content class="pt-4">
                        {#each chapters as subchapter}
                            {#if subchapter.parent?.title === chapter.title}
                                <div class="flex items-start space-x-2">
                                    <div class="grid place-items-center">
                                        <Checkbox
                                                class="h-4 w-4 text-blue-600"
                                                checked={isPageComponent && subchapter.title === currentChapterTitle
                                                ? 'indeterminate'
                                                : progress.some((c) => c.chapter === subchapter.id)}
                                                disabled
                                        />
                                        {#if subchapter !== chapters
                                            .filter((item) => item.parent?.title === chapter.title)
                                            .slice(-1)[0]}
                                            <div
                                                    class="my-2 border-l-2 {progress.some((c) => c.chapter === subchapter.id)
                                                    ? 'border-blue-600'
                                                    : 'border-gray-300'} h-6"
                                            ></div>
                                        {/if}
                                    </div>
                                    <Label class="text-sm">
                                        <a
                                                href={`${env.PUBLIC_WEB_URL}/courses/${subchapter.kurs.slug}/chapters/${subchapter.slug}`}
                                                class="hover:text-blue-500"
                                        >
                                            {subchapter.title}
                                        </a>
                                    </Label>
                                </div>
                            {/if}
                        {/each}
                    </Accordion.Content>
                </Accordion.Item>
            {:else}
                <div class="flex items-center space-x-2 border-b pb-2 pt-4">
                    <Checkbox
                            id="chapter"
                            checked={isPageComponent && chapter.title === currentChapterTitle
                            ? 'indeterminate'
                            : progress.some((c) => c.chapter === chapter.id)}
                            disabled
                    />
                    <Label class="text-sm font-medium">
                        <a
                                href={`${env.PUBLIC_WEB_URL}/courses/${chapter.kurs.slug}/chapters/${chapter.slug}`}
                                class="hover:text-blue-500"
                        >
                            {chapter.title}
                        </a>
                    </Label>
                </div>
            {/if}
        {/if}
    {/each}
</Accordion.Root>