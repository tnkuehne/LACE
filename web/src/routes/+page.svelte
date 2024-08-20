<script>
	import CourseCard from './CourseCard.svelte';
	import ScrollText from 'lucide-svelte/icons/scroll-text';
	import Grainy from './Grainy.svelte';
	import SEO from '$lib/components/SEO.svelte';

	export let data;
	const { seo } = data.landing;
</script>

<SEO seo={seo} defaultTitle="Learn about Privacy Enhancing Technology" defaultDescription="Support your organization in adopting Privacy-Enhancing Technologies"/>

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
		class="absolute inset-0 bg-gradient-to-br from-blue-600 from-40% to-purple-700 to-90% opacity-30"
	></div>

	<!-- Image Overlay -->
	<Grainy class="absolute inset-0 h-full w-full object-cover mix-blend-overlay" />

	<!-- Text Content within a centered max width container -->
	<div class="relative flex w-full justify-center">
		<div class="w-full max-w-screen-2xl space-y-12 p-4 pb-16 pt-8 md:space-y-32 lg:space-y-64">
			<div class="flex justify-start">
				<div class="space-y-64">
					<h1
						class="font-sansation text-4xl font-bold uppercase lining-nums tabular-nums leading-none tracking-[0.12em] text-blue-800 dark:text-blue-600 md:text-6xl"
					>
						LACE
					</h1>
					<div class="w-4/5 space-y-8">
						<div class="space-y-2">
							<p class="text-4xl font-bold md:text-6xl">{data.landing.title}</p>
							<p class="text-4xl font-bold md:text-6xl">{data.landing.subtitle}</p>
						</div>
						<div class="space-y-2">
							<p class="text-xl md:text-3xl">{data.landing.description}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="min-h-screen">
	<div
		class="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center space-y-16 p-4 pt-16"
	>
		<section class="space-y-8">
			<div class="space-y-4">
				<h2 class="text-center text-4xl font-bold lg:text-6xl">{data.landing.courses_title}</h2>
				<p class="text-center text-lg text-gray-600 lg:text-base">
					{data.landing.courses_description}
				</p>
			</div>
			<div
				class="-m-2 flex flex-col justify-center space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0"
			>
				{#each data.courses as course}
					<div class="w-full p-2">
						<CourseCard
							title={course.Title}
							slug={course.slug}
							description={course.Description}
							buttonText={data.landing.courses_action_button_text}
							icon={course.icon}
							color={course.color}
						/>
					</div>
				{/each}
			</div>
		</section>
		<section class="space-y-8">
			<div class="space-y-4">
				<h2 class="text-center text-4xl font-bold lg:text-6xl">
					{data.landing.publications_title}
				</h2>
				<p class="text-center text-lg text-gray-600 lg:text-base">
					{data.landing.publications_description}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				{#each data.landing.publications_links as link}
					<div class="flex flex-row gap-2">
						<ScrollText class="h-6 w-6 min-w-[1.5rem] text-blue-800 dark:text-blue-600" />
						<a
							href={link.url}
							class="line-clamp-2 border-l-2 border-orange-200 pl-2 text-xl hover:text-blue-800 dark:hover:text-blue-600"
							>{link.title}</a
						>
					</div>
				{/each}
			</div>
		</section>
	</div>
</div>
<footer class="bg-sky-100 dark:bg-blue-950">
	<div
		class="mx-auto flex max-w-screen-2xl flex-col justify-between space-y-16 px-8 py-16 md:flex-row md:space-y-0 md:px-0"
	>
		<div class="flex flex-col gap-8">
			<enhanced:img src="./logo_sebis_cit.png?w=400" alt="Logo" loading="lazy" />
			<div class="text-sm text-gray-600 dark:text-gray-400">
				<p>Copyright © 2024 SEBIS Chair @TUM</p>
				<p>All rights reserved</p>
			</div>
		</div>
		<div class="flex flex-row gap-32">
			<div class="space-y-4">
				<h5 class="font-medium">Links</h5>
				<ul>
					{#each data.landing.links as link}
						<li>
							<a href={link.url} class="hover:text-blue-800 dark:hover:text-blue-600"
								>{link.title}</a
							>
						</li>
					{/each}
				</ul>
			</div>
			<div class="space-y-4">
				<h5 class="font-medium">Sponsor</h5>
				<enhanced:img src="./publisherlogo-en.svg" alt="Sponsor" loading="lazy" />
			</div>
		</div>
	</div>
</footer>
