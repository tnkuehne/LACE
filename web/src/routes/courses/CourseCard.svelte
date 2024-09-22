<script lang="ts">
	import { env } from '$env/dynamic/public';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { progressStore } from '$lib/stores/progressStore';
	import Share2 from 'lucide-svelte/icons/share-2';
	import CirclePlay from 'lucide-svelte/icons/circle-play';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import ChapterList from './ChapterList.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Linkedin from 'lucide-svelte/icons/linkedin';
	import Link from 'lucide-svelte/icons/link';
	import Mail from 'lucide-svelte/icons/mail';

	export let course;
	export let chapters;
	export let toast_text;

	let firstNotCompletedChapterPromise: Promise<string>;

	$: firstNotCompletedChapterPromise = (async () => {
		for (let chapter of chapters) {
			const isCompleted = await progressStore.isChapterCompleted(course.id, chapter.id);
			if (!isCompleted) {
				return `/courses/${course.slug}/chapters/${chapter.slug}`;
			}
		}
		return ''; // All chapters completed
	})();

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

	function openLinkedinInNewTab() {
		const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${env.PUBLIC_URL}/courses/${course.slug}`;
		window.open(linkedinUrl, '_blank');
	}

	function openMailTo() {
		const mailToUrl = `mailto:?subject=Check out this course&body=${env.PUBLIC_URL}/courses/${course.slug}`;
		window.location.href = mailToUrl;
	}
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
					<div class="flex h-8 w-8 items-center justify-center">
						{#await firstNotCompletedChapterPromise}
							<!-- Placeholder while loading -->
						{:then firstNotCompletedChapterUrl}
							{#if firstNotCompletedChapterUrl}
								<Button
									variant="ghost"
									href={firstNotCompletedChapterUrl}
									class="h-full w-full p-0"
								>
									<CirclePlay class="h-4 w-4" />
								</Button>
							{/if}
						{/await}
					</div>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Share2 class="h-4 w-4" />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Label>Share</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.Item on:click={openLinkedinInNewTab}>
									<Linkedin class="mr-2 h-4 w-4" />
									<span>LinkedIn</span>
								</DropdownMenu.Item>
								<DropdownMenu.Item on:click={copyCourseLink}>
									<Link class="mr-2 h-4 w-4" />
									<span>Link</span>
								</DropdownMenu.Item>
								<DropdownMenu.Item on:click={openMailTo}>
									<Mail class="mr-2 h-4 w-4" />
									<span>Mail</span>
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</div>
	</Card.Header>
	<Separator class="h-1 bg-blue-400" />
	<Card.Content class="flex flex-grow flex-col justify-between">
		<ChapterList {chapters} courseId={course.id} />
	</Card.Content>
</Card.Root>
