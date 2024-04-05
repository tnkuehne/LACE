<script lang="ts">
    export let data;
</script>

{#if data.slides.length > 0}
    <ul>
        {#each data.slides as slide}
            <li>
                {slide.image}
            </li>
        {/each}
    </ul>
{:else}
    <p>No slides available for this chapter.</p>
{/if}
