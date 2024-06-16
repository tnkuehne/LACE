<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import UserDetailsForm from './UserDetailsForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let open = true;
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

{#if $isDesktop}
	<Dialog.Root bind:open closeOnOutsideClick={false}>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{data.settings.details_form_title}</Dialog.Title>
				<Dialog.Description>
					{data.settings.details_form_description}
				</Dialog.Description>
			</Dialog.Header>
			<UserDetailsForm course={data.course.Title} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>{data.settings.details_form_title}</Drawer.Title>
				<Drawer.Description>
					{data.settings.details_form_description}
				</Drawer.Description>
			</Drawer.Header>
			<UserDetailsForm course={data.course.Title} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
