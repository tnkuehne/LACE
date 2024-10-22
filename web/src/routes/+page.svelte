<script>
	import CourseCard from './CourseCard.svelte';
	import ScrollText from 'lucide-svelte/icons/scroll-text';
	import Grainy from './Grainy.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { marked } from 'marked';
	import { Button } from '$lib/components/ui/button/index';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index';
	import Footer from '$lib/components/Footer.svelte';

	import ThemeToggle from '$lib/components/ui/theme-toggle/ThemeToggle.svelte';
	import { env } from '$env/dynamic/public';

	export let data;

	const defaultHeading =
		'# **Learn. Apply. Comply.**\n' +
		'## **Continuing Education Materials on <br> Privacy-Enhancing Technologies**\n' +
		'Support your organization in adapting  to Privacy Enhancing Technologies';

	$: parsedHeading = marked(data.landing?.heading ?? defaultHeading);
	$: parsedWhitePaper = marked(data.landing?.white_paper_abstract ?? '');

	function handleDownloadClick() {
		fetch('/api/analytics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ path: '/download', referrer: '/' })
		});
	}
</script>

<SEO
	seo={data.landing?.seo}
	defaultTitle="Learn about Privacy Enhancing Technology"
	defaultDescription="Support your organization in adopting Privacy-Enhancing Technologies"
/>

<div class="relative flex w-full flex-col overflow-x-hidden lg:flex-row">
	<div class="absolute right-0 top-0">
		<!-- Largest Circle -->
		<div
			class="-mx-24 -my-32 flex h-[32rem] w-[32rem] items-center justify-center rounded-full border-8 border-black opacity-5 md:-mx-36 md:-my-48 md:h-[48rem] md:w-[48rem] lg:-mx-72 lg:-my-96 lg:h-[64rem] lg:w-[64rem]"
		>
			<!-- Medium Circle -->
			<div
				class="-mx-33 lg:-my-66 lg:-my-88 lg:-mx-66 -my-44 flex h-[24rem] w-[24rem] items-center justify-center rounded-full border-8 border-black opacity-100 md:h-[36rem] md:w-[36rem] lg:-mx-48 lg:h-[48rem] lg:w-[48rem]"
			>
				<!-- lgallest Circle -->
				<div
					class="-mx-24 -my-32 h-[16rem] w-[16rem] rounded-full border-8 border-black opacity-100 md:-mx-36 md:-my-48 md:h-[24rem] md:w-[24rem] lg:-mx-48 lg:-my-64 lg:h-[32rem] lg:w-[32rem]"
				></div>
			</div>
		</div>
	</div>
	<!-- Gradient Background -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-blue-600 from-75% to-purple-700 to-100% opacity-30"
	></div>

	<!-- Image Overlay -->
	<Grainy class="absolute inset-0 h-full w-full object-cover mix-blend-overlay" />

	<!-- Text Content within a centered max width container -->
	<div class="relative flex w-full justify-center">
		<div class="w-full max-w-screen-2xl space-y-12 p-4 pb-32 pt-8 md:space-y-32 lg:space-y-64">
			<div class="space-y-64">
				<div class="flex flex-row justify-between">
					<h1
						class="font-sansation text-4xl font-bold uppercase lining-nums tabular-nums leading-none tracking-[0.12em] text-blue-800 dark:text-blue-600 md:text-6xl"
					>
						LACE
					</h1>
					<ThemeToggle buttonVariant="outline" class="rounded-full" />
				</div>
				<div
					class="prose-black prose dark:prose-invert md:prose-xl lg:prose-2xl prose-headings:my-2"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html parsedHeading}
				</div>
			</div>
		</div>
	</div>
</div>
<div class="min-h-screen pb-16">
	<div
		class="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center space-y-32 p-4 pt-32"
	>
		<section>
			<div class="space-y-16">
				<div class="space-y-4">
					<h2 class="text-center text-3xl font-bold lg:text-5xl">
						{data.landing?.courses_title ?? 'Courses'}
					</h2>
					<p class="text-center text-lg lg:text-base">
						{data.landing?.courses_description ??
							'Concise yet informative courses tailored to the specific needs of different practitioner groups'}
					</p>
					<div class="flex justify-center">
						<Button variant="link" href={`${env.PUBLIC_WEB_URL}/courses`}>Detailed Overview</Button>
					</div>
				</div>
				<div
					class="-m-2 flex flex-col justify-center space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0"
				>
					{#await data.courses}
						<!-- ToDo: Evaluate Skeleton -->
					{:then courses}
						{#each courses as course}
							<div class="w-full p-2">
								<CourseCard
									title={course.Title}
									slug={course.slug}
									description={course.Description}
									buttonText={data.landing?.courses_action_button_text ?? 'Learn More'}
									color={course.color}
								/>
							</div>
						{/each}
					{:catch error}
						<Alert.Root>
							<CircleAlert class="h-4 w-4" />
							<Alert.Title>Courses Display Error</Alert.Title>
							<Alert.Description>
								We encountered an error while loading the courses. Please try again later. Error
								details: {error.message}
							</Alert.Description>
						</Alert.Root>
					{/await}
				</div>
			</div>
		</section>
		<section id="white-paper">
			<div class="space-y-16">
				<div class="space-y-4">
					<h2 class="text-center text-3xl font-bold lg:text-5xl">
						{data.landing?.white_paper_section_title ?? 'White Paper'}
					</h2>
					<p class="text-center text-lg lg:text-base">
						{data.landing?.white_paper_section_description ??
							'Concise yet informative courses tailored to the specific needs of different practitioner groups'}
					</p>
				</div>
				<div
					class="flex flex-col justify-between space-y-8 rounded-3xl bg-white p-4 dark:bg-secondary lg:flex-row lg:space-y-0"
				>
					{#if data.landing?.white_paper_pdf && data.landing?.white_paper_pdf.length > 0}
						<div class="order-2 flex flex-col items-center space-y-4 p-12 py-16 lg:order-1">
							<div class="prose-black prose dark:prose-invert">
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html parsedWhitePaper}
							</div>
							<Button
								class="text-md size-fit font-bold text-secondary"
								href={`${env.PUBLIC_CMS_URL}/assets/${data.landing?.white_paper_pdf}?download`}
								target="_blank"
								download="WhitePaper.pdf"
								on:click={handleDownloadClick}>{data.landing?.white_paper_button}</Button
							>
						</div>
						<div class="relative order-1 flex justify-center lg:order-2 lg:w-1/2">
							<div class="relative z-10 w-full content-center lg:w-4/5">
								<img
									src={`${env.PUBLIC_CMS_URL}/assets/${data.landing?.cover}`}
									alt="White Paper"
									class="h-auto w-full"
									loading="lazy"
								/>
							</div>
						</div>
					{:else}
						<Alert.Root>
							<CircleAlert class="h-4 w-4" />
							<Alert.Title>White Paper Display Error</Alert.Title>
							<Alert.Description>
								We're currently unable to display our white paper. Please check back later.
							</Alert.Description>
						</Alert.Root>
					{/if}
				</div>
			</div>
		</section>
		<section class="space-y-16">
			<div class="space-y-4">
				<h2 class="text-center text-3xl font-bold lg:text-5xl">
					{data.landing?.publications_title ?? 'Publications'}
				</h2>
				<p class="text-center text-lg lg:text-base">
					{data.landing?.publications_description ??
						'Selected scientific publications on the topics of Data Privacy, Privacy-Enhancing Technologies and Compliance'}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				{#if data.landing?.publications_links && data.landing?.publications_links.length > 0}
					{#each data.landing?.publications_links as link}
						<div class="flex flex-row gap-2">
							<ScrollText class="h-6 w-6 min-w-[1.5rem] text-teal-400 dark:text-teal-600" />
							<a
								href={link.url}
								class="line-clamp-2 border-l-2 border-orange-200 pl-2 text-xl hover:text-blue-800 dark:hover:text-blue-600"
								>{link.title}</a
							>
						</div>
					{/each}
				{:else}
					<Alert.Root>
						<CircleAlert class="h-4 w-4" />
						<Alert.Title>Publications Display Error</Alert.Title>
						<Alert.Description>
							We're currently unable to display our publications. Please check back later.
						</Alert.Description>
					</Alert.Root>
				{/if}
			</div>
		</section>
	</div>
</div>
<Footer links={data.landing?.links} />
