<script>
	import { Button } from '$lib/components/ui/button';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { page } from '$app/stores';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index';

	export let data;
</script>

<div class="p-4 shadow-sm">
	<div class="mx-auto flex max-w-screen-2xl flex-row items-center gap-4">
		<Button
			variant="outline"
			size="icon"
			href="{$page.url.origin}{$page.url.pathname.split('/').slice(0, -1).join('/')}"
		>
			<ChevronLeft class="h-4 w-4" />
		</Button>
		<div class="flex flex-col">
			<h2 class="text-2xl font-bold capitalize">
				{decodeURIComponent($page.url.pathname.split('/').slice(-1).toString().replace(/-/g, ' '))}
			</h2>
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					{#each $page.url.pathname.split('/').slice(1) as crumb, index (crumb)}
						<Breadcrumb.Item>
							<Breadcrumb.Link
								class="capitalize"
								href={`/${$page.url.pathname
									.split('/')
									.slice(1, index + 2)
									.join('/')}`}
								>{decodeURIComponent(crumb.toString().replace(/-/g, ' '))}</Breadcrumb.Link
							>
						</Breadcrumb.Item>
						{#if index !== $page.url.pathname.split('/').slice(1).length - 1}
							<Breadcrumb.Separator />
						{/if}
					{/each}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</div>
	</div>
</div>

<slot />

<footer class="mt-16 bg-sky-100 dark:bg-blue-950">
	<div
		class="mx-auto flex max-w-screen-2xl flex-col justify-between space-y-16 px-8 py-16 md:flex-row md:space-y-0 md:px-0"
	>
		<div class="flex flex-col gap-8">
			<enhanced:img src="../logo_sebis_cit.png?w=400" alt="Logo" loading="lazy" />
			<div class="text-sm text-gray-600 dark:text-gray-400">
				<p>Copyright © 2024 SEBIS Chair @TUM</p>
				<p>All rights reserved</p>
			</div>
		</div>
		<div class="flex flex-row gap-32">
			<div class="space-y-4">
				<h5 class="font-medium">Links</h5>
				{#if data.landing?.links && data.landing.links.length > 0}
					<ul>
						{#each data.landing?.links as link}
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
				<enhanced:img src="../publisherlogo-en.svg" alt="Sponsor" loading="lazy" />
			</div>
		</div>
	</div>
</footer>
