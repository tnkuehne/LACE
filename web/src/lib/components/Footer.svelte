<script lang="ts">
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index';

	export let links;
</script>

<footer class="mt-16 bg-sky-100 dark:bg-blue-950">
	<div
		class="mx-auto flex max-w-screen-2xl flex-col justify-between space-y-16 px-8 py-16 md:flex-row md:space-y-0 md:px-0"
	>
		<div class="flex flex-col gap-8">
			<enhanced:img src="../assets/logo_sebis_cit.png?w=400" alt="Logo" loading="lazy" />
			<div class="text-sm text-gray-600 dark:text-gray-400">
				<p>Copyright © 2024 SEBIS Chair @TUM</p>
				<p>All rights reserved</p>
			</div>
		</div>
		<div class="flex flex-row gap-32">
			<div class="space-y-4">
				<h5 class="font-medium">Links</h5>
				{#if links && links.length > 0}
					<ul>
						{#each links as link}
							<li>
								<a href={link.url} class="hover:text-blue-800 dark:hover:text-blue-600"
									>{link.title}</a
								>
							</li>
						{/each}
					</ul>
				{:else}
					<Alert.Root>
						<CircleAlert class="h-4 w-4" />
						<Alert.Title>Links Display Error</Alert.Title>
						<Alert.Description>
							We're currently unable to display our links. Please check back later.
						</Alert.Description>
					</Alert.Root>
				{/if}
			</div>
			<div class="space-y-4">
				<h5 class="font-medium">Sponsor</h5>
				<enhanced:img
					src="../assets/publisherlogo-en.svg"
					alt="Sponsor"
					loading="lazy"
					width="168"
					height="84"
				/>
			</div>
		</div>
	</div>
</footer>
