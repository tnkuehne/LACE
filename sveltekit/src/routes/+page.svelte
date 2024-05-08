<script>
    import CourseCard from "./CourseCard.svelte";
</script>

<div class="relative w-full h-auto lg:h-[60vh] flex flex-col lg:flex-row">
    <div class="absolute top-0 right-0">
        <!-- Largest Circle -->
        <div class="w-[32rem] h-[32rem] md:w-[48rem] md:h-[48rem] lg:w-[64rem] lg:h-[64rem] rounded-full border-8 border-black opacity-5 flex items-center justify-center -my-32 -mx-24 md:-my-48 md:-mx-36 lg:-my-96 lg:-mx-72">
            <!-- Medium Circle -->
            <div class="w-[24rem] h-[24rem] md:w-[36rem] md:h-[36rem] lg:w-[48rem] lg:h-[48rem] rounded-full border-8 border-black opacity-100 flex items-center justify-center -my-44 -mx-33 lg:-my-66 lg:-mx-48 lg:-my-88 lg:-mx-66">
                <!-- lgallest Circle -->
                <div class="w-[16rem] h-[16rem] md:w-[24rem] md:h-[24rem] lg:w-[32rem] lg:h-[32rem] rounded-full border-8 border-black opacity-100 -my-32 -mx-24 md:-my-48 md:-mx-36 lg:-my-64 lg:-mx-48">
                </div>
            </div>
        </div>
    </div>
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-40% from-blue-500 to-90% to-purple-500 opacity-30"></div>

    <!-- Image Overlay -->
    <img src="http://localhost:5173/grainy.png" alt="Overlay" class="mix-blend-overlay w-full h-full object-cover">

    <!-- Text Overlay -->
    <div class="absolute inset-x-0 top-0 mx-auto max-w-screen-xl p-4 space-y-12 md:space-y-32 lg:space-y-64 pt-8">
        <h1 class="text-4xl md:text-6xl font-bold uppercase text-primary">LACE</h1>
        <div class="space-y-4">
            <div class="space-y-2">
                <p class="text-4xl md:text-6xl font-bold">Learn. Apply. Comply.</p>
                <p class="text-4xl md:text-6xl font-bold">Continuing Education Materials on </p>
                <p class="text-4xl md:text-6xl font-bold">Privacy-Enhancing Technologies</p>
            </div>
            <div class="space-y-2">
                <p class="text-xl md:text-3xl">Support your organization in adapting</p>
                <p class="text-xl md:text-3xl">to Privacy Enhancing Technologies</p>
            </div>
        </div>
    </div>
</div>
<div class="bg-gray-50 min-h-screen">
    <div class="flex flex-col items-center justify-center pt-16 space-y-8 w-full max-w-screen-xl mx-auto p-4">
        <div class="space-y-4">
            <h2 class="text-4xl lg:text-6xl font-bold text-center">Courses</h2>
            <p class="text-lg lg:text-base text-gray-600 text-center">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore</p>
        </div>
        <div class="flex flex-col lg:flex-row justify-center lg:space-x-4 space-y-4 lg:space-y-0">
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </div>
    </div>
</div>
