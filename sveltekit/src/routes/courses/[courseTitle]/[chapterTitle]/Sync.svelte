<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SyncCode from './SyncCode.svelte';
	import { progressStore } from '$lib/stores/progressStore';
	import { PUBLIC_URL } from '$env/static/public';

	export let trigger_button: string;
	export let title: string;
	export let description: string;

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');

	let url = '';

	$: {
		if (open) {
			(async () => {
				const enabled = await progressStore.isSyncEnabled();
				if (!enabled) {
					console.log('Syncing enabled');
					const code = await progressStore.enableSyncing();
					url = `${PUBLIC_URL}/c/${code}`;
				} else {
					console.log('Syncing already enabled');
					const code = await progressStore.getSyncCode();
					url = `${PUBLIC_URL}/c/${code}`;
				}
			})();
		}
	}
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]}>{trigger_button}</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Description>
					{description}
				</Dialog.Description>
			</Dialog.Header>
			<SyncCode {url} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]}>{trigger_button}</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>{title}</Drawer.Title>
				<Drawer.Description>
					{description}
				</Drawer.Description>
			</Drawer.Header>
			<div class="px-4">
				<SyncCode {url} />
			</div>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
