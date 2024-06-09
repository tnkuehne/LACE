<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

{#if data.status === 200}
	<h1>Certificate Verification</h1>
	<p>Certificate is valid.</p>
	<p>Name: {data.certificateData.userName}</p>
	<p>Course: {data.certificateData.courseName}</p>
	<p>Certificate ID: {data.certificateData.certificateId}</p>
{:else}
	<h1>Verification Error</h1>
	<p>{data.error}</p>
{/if}
