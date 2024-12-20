<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';
	import { progressStore } from '$lib/stores/progressStore';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import Survey from './Survey.svelte';
	import Sync from './Sync.svelte';
	import ThemeToggle from '$lib/components/ui/theme-toggle/ThemeToggle.svelte';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import { isFullScreen } from '$lib/stores/fullScreen';
	import ChapterList from '../../../ChapterList.svelte';

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
</script>

<nav
	class="fixed inset-x-0 bottom-0 z-50 flex justify-between bg-slate-100 p-2 dark:bg-slate-900 lg:relative lg:inset-auto lg:z-auto lg:hidden"
>
	<h1
		class="lg:text-6x font-sansation text-4xl font-bold uppercase lining-nums tabular-nums leading-none tracking-[0.12em] text-blue-800"
	>
		LACE
	</h1>
	<Button variant="outline" size="icon" on:click={toggleMenu} class="lg:hidden">
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
		class={`fixed inset-x-0 bottom-0 bg-slate-100 dark:bg-slate-900 ${
			menu ? 'block' : 'hidden'
		} z-40 h-3/4 overflow-y-auto p-8 lg:relative lg:h-auto lg:w-1/4 ${
			$isFullScreen ? 'lg:hidden' : 'lg:block'
		}`}
	>
		<div class="flex flex-row items-center gap-2">
			<Button
				variant="outline"
				size="icon"
				href={$page.url.pathname.split('/').slice(0, -2).join('/')}
			>
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<h2 class="text-2xl font-bold">{data.chapters[0].kurs.Title}</h2>
		</div>

		<h4 class="mb-4 mt-8 text-sm font-medium text-gray-500">Your progress</h4>
		<div class="mb-4">
			<div class="mb-1 mt-2 text-sm font-medium">
				<span>{progress.toFixed(0)}% completed</span>
			</div>
			<Progress class="rounded-full bg-gray-200 dark:bg-gray-800" value={progress} />
		</div>

		<div class="flex flex-col gap-4 xl:flex-row">
			<!-- show button with link instead of survey for one specific course -->
			{#if data.chapters[0].kurs.slug === 'basics-of-pets-for-non-technical-professionals'}
				<Button href="https://lacesurvey.paperform.co/" variant="outline">
					Give Feedback <ExternalLink class="ml-2 h-4 w-4" />
				</Button>
			{:else}
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
			{/if}
			<Sync
				trigger_button={data.settings.sync_trigger_button}
				title={data.settings.sync_title}
				description={data.settings.sync_description}
			/>
			<ThemeToggle buttonVariant="outline" />
		</div>

		<div class="pb-8 pt-8">
			<ChapterList
				chapters={data.chapters}
				courseId={data.chapters[0].kurs.id}
				currentChapterTitle={$page.data.chapter?.[0]?.Title ?? ''}
				isPageComponent={true}
			/>
		</div>
	</div>

	<!-- Main Content -->
	<div class={`p-16 ${$isFullScreen ? 'w-full' : 'lg:w-3/4'}`}>
		<slot />
	</div>
</div>
