<script>
	import { env } from '$env/dynamic/public';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { progressStore } from '$lib/stores/progressStore';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Accordion from '$lib/components/ui/accordion';

	export let course;
	export let chapters;
</script>

<Card.Root class="flex flex-grow flex-col">
	<Card.Header class="flex-grow-0">
		<img
			src={`${env.PUBLIC_APIURL}/assets/${course.Image}`}
			alt="Slide {course.Title}"
			class="h-48 w-full object-cover"
		/>
		<Card.Title>{course.Title}</Card.Title>
	</Card.Header>
	<Separator class="h-1 bg-blue-400" />
	<Card.Content class="flex flex-grow flex-col justify-between">
		<Accordion.Root value="item-1" class="flex-grow">
			{#each chapters as chapter, index}
				{#if chapter.parent === null}
					<Accordion.Item value="item-{index}">
						<Accordion.Trigger>
							<div class="flex items-center space-x-2">
								<Checkbox
									checked={chapter.active
										? 'indeterminate'
										: !!$progressStore[chapter.kurs.id]?.completedChapters.includes(chapter.id)}
									disabled
								/>
								<Label class="text-sm font-medium">
									<a
										href={`/courses/${chapter.kurs.Title}/${chapter.title}`}
										class="hover:text-blue-500"
									>
										{chapter.title}
									</a>
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
												checked={subchapter.active
													? 'indeterminate'
													: !!$progressStore[subchapter.kurs.id]?.completedChapters.includes(
															subchapter.id
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
													]?.completedChapters.includes(subchapter.id)
														? 'border-blue-600'
														: 'border-gray-300'} h-6"
												></div>
											{/if}
										</div>
										<Label class="text-sm">
											<a
												href={`/courses/${subchapter.kurs.Title}/${subchapter.title}`}
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
				{/if}
			{/each}
		</Accordion.Root>
	</Card.Content>
</Card.Root>
