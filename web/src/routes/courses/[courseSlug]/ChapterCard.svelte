<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import Lightbulb from './Lightbulb.svelte';
	import BookOpenText from 'lucide-svelte/icons/book-open-text';
	import { progressStore } from '$lib/stores/progressStore';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import Clock4 from 'lucide-svelte/icons/clock-4';

	export let chapter;
	export let subchapters;

	function hexToRGBA(hex: string, alpha: number) {
		let r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		if (alpha) {
			return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
		} else {
			return 'rgb(' + r + ', ' + g + ', ' + b + ')';
		}
	}

	$: progress = $progressStore[chapter.kurs.id]?.completed_chapters || [];
	$: chapterProgress = progress.find((c) => c.chapter === chapter.id);
	$: subchapterProgress = subchapters.map((subchapter) => {
		return progress.find((c) => c.chapter === subchapter.id);
	});

	$: progressStatus = chapterProgress
		? 'completed'
		: subchapterProgress.some((c) => c)
			? 'in-progress'
			: 'not-started';
</script>

<Card.Root>
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div class="flex flex-row items-center gap-2">
				<BookOpenText />
				<Card.Title>
					<a
						class="hover:text-blue-600"
						href={`/courses/${chapter.kurs.slug}/chapters/${chapter.slug}`}
					>
						{chapter.title}
					</a>
				</Card.Title>
			</div>
			<div>
				{#if progressStatus === 'completed'}
					<Badge class="rounded-lg bg-green-500 text-secondary"
						><CircleCheck class="mr-1 h-3 w-3 fill-secondary stroke-green-500" />Completed</Badge
					>
				{:else if progressStatus === 'in-progress'}
					<Badge class="rounded-lg bg-amber-500 text-secondary"
						><Clock4 class="mr-1 h-3 w-3 fill-secondary stroke-amber-500" />In Progress</Badge
					>
				{:else}
					<Badge class="rounded-lg bg-gray-400 text-secondary"
						><Clock4 class="mr-1 h-3 w-3 fill-secondary stroke-gray-400" />Not Started</Badge
					>
				{/if}
			</div>
		</div>
		<Separator />
	</Card.Header>
	<Card.Content>
		<div class="flex flex-row gap-2">
			<div class="h-16 w-16">
				<Lightbulb />
			</div>
			<div class="flex flex-col gap-4">
				<p>{chapter.description}</p>
				<div class="flex w-2/3 flex-col gap-2">
					{#each subchapters as subchapter}
						<a
							class="border border-l-8 p-1 hover:text-blue-600"
							style="border-color: {hexToRGBA(subchapter.color, 0.4)};"
							href={`/courses/${chapter.kurs.slug}/chapters/${subchapter.slug}`}
							>{subchapter.title}</a
						>
					{/each}
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>
