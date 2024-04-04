<script lang="ts">
    import Slideshow from "./slideshow.svelte";
    import { Separator } from "$lib/components/ui/separator";
</script>

<div class="flex flex-col items-center">
    <h1 class="text-4xl font-bold">Chapter Title</h1>
    <Separator />
    <div class="w-4/5 mx-auto">
        <Slideshow/>
    </div>
</div>




