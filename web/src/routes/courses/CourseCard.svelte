<script lang="ts">
	import { env } from '$env/dynamic/public';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { progressStore } from '$lib/stores/progressStore';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Accordion from '$lib/components/ui/accordion';
	import Share2 from 'lucide-svelte/icons/share-2';
	import CirclePlay from 'lucide-svelte/icons/circle-play';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	export let course;
	export let chapters;
	export let toast_text;

	function copyCourseLink() {
		const courseLink = `${env.PUBLIC_URL}/courses/${course.slug}`;
		navigator.clipboard
			.writeText(courseLink)
			.then(() => {
				toast(toast_text);
			})
			.catch((err) => {
				console.error('Failed to copy course link: ', err);
			});
	}

	function getFirstNotCompletedChapter() {
		for (let chapter of chapters) {
			if (!progressStore.isChapterCompleted(course.id, chapter.id)) {
				return `/courses/${course.slug}/chapters/${chapter.slug}`;
			}
		}
		return null;
	}

	function hasChildren(chapterTitle: string) {
		return chapters.some((c) => c.parent?.title === chapterTitle);
	}

	$: firstNotCompletedChapterUrl = getFirstNotCompletedChapter();
</script>

<Card.Root class="flex flex-grow flex-col">
	<img
		src={`${env.PUBLIC_URL}/cms/assets/${course.Image}`}
		alt="Slide {course.Title}"
		class="h-48 w-full rounded-t-lg bg-gradient-to-br from-blue-600 from-40% to-purple-700 to-90% object-right"
	/>
	<Card.Header class="flex flex-col pb-0 pl-6">
		<div class="flex flex-col">
			<Card.Title class="text-left hover:text-blue-600">
				<a href={`/courses/${course.slug}`}>{course.Title}</a>
			</Card.Title>
			<div class="flex flex-row justify-between">
				<span class="text-gray-500">Lectures</span>
				<div class="flex flex-row">
					<Button variant="ghost" href={firstNotCompletedChapterUrl}>
						<CirclePlay class="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						class="ml-auto cursor-pointer"
						on:click={copyCourseLink}
					>
						<Share2 class="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	</Card.Header>
	<Separator class="h-1 bg-blue-400" />
	<Card.Content class="flex flex-grow flex-col justify-between">
		<Accordion.Root value="item-0" class="flex-grow">
			{#each chapters as chapter, index}
				{#if chapter.parent === null}
					{#if hasChildren(chapter.title)}
						<Accordion.Item value="item-{index}">
							<Accordion.Trigger>
								<div class="flex items-center space-x-2">
									<!--<Checkbox
                                        id="chapter"
                                        checked={!!$progressStore[chapter.kurs.id]?.completedChapters.includes(chapter.id)}
                                        disabled
                                    />-->
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
													checked={!!$progressStore[subchapter.kurs.id]?.completed_chapters.some(
														(c) => c.chapter === subchapter.id
													)}
													disabled
												/>
												<!-- Add vertical line below checkbox -->
												{#if subchapter !== chapters
														.filter((item) => item.parent?.title === chapter.title)
														.slice(-1)[0]}
													<div
														class="my-2 border-l-2 {$progressStore[
															subchapter.kurs.id
														]?.completed_chapters.some((c) => c.chapter === subchapter.id)
															? 'border-blue-600'
															: 'border-gray-300'} h-6"
													></div>
												{/if}
											</div>
											<Label class="text-sm">
												<a
													href={`/courses/${subchapter.kurs.slug}/chapters/${subchapter.slug}`}
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
								checked={!!$progressStore[chapter.kurs.id]?.completed_chapters.some(
									(c) => c.chapter === chapter.id
								)}
								disabled
							/>
							<Label class="text-sm font-medium">
								<a
									href={`/courses/${chapter.kurs.slug}/chapters/${chapter.slug}`}
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
	</Card.Content>
</Card.Root>
