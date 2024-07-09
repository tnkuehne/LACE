<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { progressStore } from '$lib/stores/progressStore';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import Survey from './Survey.svelte';
	import Sync from './Sync.svelte';

	export let data;
	let menu = false;
	let progress = 0;
	let isSurveyDisabled = false;

	// Subscribe to progress store updates
	$: progressStore.subscribe(async () => {
		progress = await progressStore.getCourseProgress(
			data.chapters[0].kurs.id,
			data.chapters.length
		);
	});

	$: {
		isSurveyDisabled = progress < 90;
	}

	function toggleMenu() {
		menu = !menu;
	}

	function hasChildren(chapterTitle: string) {
		return data.chapters.some((c) => c.parent?.title === chapterTitle);
	}
</script>

<nav
	class="fixed inset-x-0 bottom-0 z-50 flex justify-between bg-neutral-50 p-2 md:relative md:inset-auto md:z-auto md:hidden"
>
	<h1
		class="md:text-6x font-sansation text-4xl font-bold uppercase lining-nums tabular-nums leading-none tracking-[0.12em] text-blue-800"
	>
		LACE
	</h1>
	<Button variant="outline" size="icon" on:click={toggleMenu} class="md:hidden">
		{#if menu}
			<X class="h-4 w-4" />
		{:else}
			<Menu class="h-4 w-4" />
		{/if}
	</Button>
</nav>

<div class="flex min-h-screen">
	<!-- Sidebar Menu -->
	<div
		class={`fixed inset-x-0 bottom-0 bg-slate-100 dark:bg-slate-900 ${menu ? 'block' : 'hidden'} z-40 h-3/4 p-8 md:relative md:block md:h-auto md:w-1/4`}
	>
		<div class="flex flex-row items-center gap-2">
			<Button
				variant="outline"
				size="icon"
				href={$page.url.pathname.split('/').slice(0, -1).join('/')}
			>
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<h2 class="text-2xl font-bold">{data.chapters[0].kurs.Title}</h2>
		</div>

		<h4 class="mb-4 mt-8 text-sm font-medium text-gray-500">Your progress</h4>
		<div class="mb-4">
			<div class="mt-2 text-sm font-medium">
				<span>{progress.toFixed(0)}% completed</span>
			</div>
			<Progress class="rounded-full bg-gray-200 dark:bg-gray-800" value={progress} />
		</div>

		<div class="flex flex-row gap-4">
			<Survey
				trigger_button={data.survey.trigger_button}
				title={data.survey.title}
				description={data.survey.description}
				questions={data.survey.questions}
				submit_button={data.survey.submit_button}
				course={data.chapters[0].kurs.Title}
				courseId={data.chapters[0].kurs.id}
				disabled={isSurveyDisabled}
				trigger_button_info={data.survey.trigger_button_info}
			/>
			<Sync
				trigger_button={data.settings.sync_trigger_button}
				title={data.settings.sync_title}
				description={data.settings.sync_description}
			/>
		</div>

		<Accordion.Root class="pt-8">
			{#each data.chapters as chapter, index}
				{#if chapter.parent === null}
					{#if hasChildren(chapter.title)}
						<Accordion.Item value="item-{index}">
							<Accordion.Trigger>
								<div class="flex items-center space-x-2">
									<!--<Checkbox
										checked={chapter.title === $page.data.chapterTitle
											? 'indeterminate'
											: !!$progressStore[chapter.kurs.id]?.completedChapters.includes(chapter.id)}
										disabled
									/>-->
									<Label class="text-sm font-medium">
										{chapter.title}
									</Label>
								</div>
							</Accordion.Trigger>
							<Accordion.Content class="pt-4">
								{#each data.chapters as subchapter}
									{#if subchapter.parent?.title === chapter.title}
										<div class="flex items-start space-x-2">
											<div class="grid place-items-center">
												<Checkbox
													class="h-4 w-4 text-blue-600"
													checked={subchapter.title === $page.data.chapter[0].title
														? 'indeterminate'
														: !!$progressStore[subchapter.kurs.id]?.completed_chapters.some(
																(c) => c.chapter === subchapter.id
															)}
													disabled
												/>
												<!-- Add vertical line below checkbox -->
												{#if subchapter !== data.chapters
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
													href={`/courses/${subchapter.kurs.slug}/${subchapter.slug}`}
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
									href={`/courses/${chapter.kurs.slug}/${chapter.slug}`}
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
	</div>

	<!-- Main Content -->
	<div class="p-16 md:w-3/4">
		<slot />
	</div>
</div>
