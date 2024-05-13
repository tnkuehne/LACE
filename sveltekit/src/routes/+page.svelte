<script>
	import CourseCard from './CourseCard.svelte';

	export let data;
</script>

<div class="relative flex w-full flex-col lg:flex-row">
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
		class="absolute inset-0 bg-gradient-to-br from-blue-500 from-40% to-purple-500 to-90% opacity-30"
	></div>

	<!-- Image Overlay -->
	<img
		src="http://localhost:5173/grainy.png"
		alt="Overlay"
		class="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
	/>

	<!-- Text Content within a centered max width container -->
	<div class="relative flex w-full justify-center">
		<div class="w-full max-w-screen-xl space-y-12 p-4 pb-16 pt-8 md:space-y-32 lg:space-y-64">
			<div class="flex justify-start">
				<div class="space-y-64">
					<h1 class="text-4xl font-bold uppercase text-primary md:text-6xl">LACE</h1>
					<div class="space-y-8">
						<div class="space-y-2">
							<p class="text-4xl font-bold md:text-6xl">Learn. Apply. Comply.</p>
							<p class="text-4xl font-bold md:text-6xl">Continuing Education Materials on</p>
							<p class="text-4xl font-bold md:text-6xl">Privacy-Enhancing Technologies</p>
						</div>
						<div class="space-y-2">
							<p class="text-xl md:text-3xl">Support your organization in adapting</p>
							<p class="text-xl md:text-3xl">to Privacy Enhancing Technologies</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="min-h-screen bg-gray-50">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center space-y-8 p-4 pt-16"
	>
		<div class="space-y-4">
			<h2 class="text-center text-4xl font-bold lg:text-6xl">Courses</h2>
			<p class="text-center text-lg text-gray-600 lg:text-base">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore
			</p>
		</div>
		<div class="-m-2 flex flex-col justify-center space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
			{#each data.courses as course}
				<div class="w-full p-2">
					<CourseCard
						title={course.Title}
						description={course.Description}
						buttonText="Learn More 🡢"
						icon={course.icon}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
