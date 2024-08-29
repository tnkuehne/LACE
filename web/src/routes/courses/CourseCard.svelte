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
	import ChapterList from "./ChapterList.svelte";

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
		<ChapterList chapters={chapters} courseId={course.id} />
	</Card.Content>
</Card.Root>
