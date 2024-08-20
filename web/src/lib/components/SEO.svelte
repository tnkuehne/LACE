<script lang="ts">

    export let seo;
    export let defaultTitle: string;
    export let defaultDescription: string;

    $: robotsContent = [
        seo.no_index ? 'noindex' : '',
        seo.no_follow ? 'nofollow' : ''
    ].filter(Boolean).join(' ');

</script>

<svelte:head>
    <title>{seo.title || defaultTitle}</title>
    <meta name="description" content={seo.meta_description || defaultDescription} />
    {#if seo.canonical_url}
        <link rel="canonical" href={seo.canonical_url} />
    {/if}
    {#if robotsContent}
        <meta name="robots" content={robotsContent} />
    {/if}
    {#if seo.og_image}
        <meta property="og:image" content={seo.og_image} />
    {/if}
</svelte:head>