<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import Lightbulb from 'lucide-svelte/icons/lightbulb';
	import BookOpenText from 'lucide-svelte/icons/book-open-text';

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
</script>

<Card.Root>
	<Card.Header>
		<div class="flex flex-row items-center gap-2">
			<BookOpenText />
			<Card.Title>{chapter.title}</Card.Title>
		</div>
		<Separator />
	</Card.Header>
	<Card.Content>
		<div class="flex flex-row gap-2">
			<Lightbulb class="h-16 w-16 fill-amber-300" />
			<div class="flex flex-col gap-4">
				<p>{chapter.description}</p>
				<div class="flex w-2/3 flex-col gap-2">
					{#each subchapters as subchapter}
						<a
							class="border border-l-8 p-1 hover:text-blue-600"
							style="border-color: {hexToRGBA(subchapter.color, 0.4)};"
							href={`/courses/${chapter.kurs.Title}/${subchapter.title}`}>{subchapter.title}</a
						>
					{/each}
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>
