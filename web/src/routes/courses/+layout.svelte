<script>
	import { Button } from '$lib/components/ui/button';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';

	export let data;
</script>

<div class="p-4 shadow-sm">
	<div class="mx-auto flex max-w-screen-2xl flex-row items-center justify-between">
		<div class="flex flex-row items-center gap-4">
			<Button
				variant="outline"
				size="icon"
				href="{$page.url.origin}{$page.url.pathname.split('/').slice(0, -1).join('/')}"
			>
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<div class="flex flex-col">
				<h2 class="text-2xl font-bold capitalize">
					{decodeURIComponent(
						$page.url.pathname.split('/').slice(-1).toString().replace(/-/g, ' ')
					)}
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
		<a
			class="font-sansation text-4xl font-bold uppercase lining-nums tabular-nums leading-none tracking-[0.12em] text-blue-800 dark:text-blue-600 md:text-5xl"
			href="/"
		>
			LACE
		</a>
	</div>
</div>

<slot />

<Footer links={data.landing?.links} />
