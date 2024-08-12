<script lang="ts">
	import Terminal from 'lucide-svelte/icons/terminal';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import UserDetailsForm from './UserDetailsForm.svelte';
	import { progressStore } from '$lib/stores/progressStore';
	import type { PageData } from './$types';

	export let data: PageData;

	let open = true;
	const isDesktop = mediaQuery('(min-width: 768px)');
	let certificateIssued = false;

	// Check if the certificate is already issued for the course
	(async () => {
		certificateIssued = await progressStore.isCertificateIssued(data.course.Title);
	})();
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
			{#if certificateIssued}
				<Alert.Root>
					<Terminal class="h-4 w-4" />
					<Alert.Title>Heads up!</Alert.Title>
					<Alert.Description>
						The certificate for this course has already been issued.
					</Alert.Description>
				</Alert.Root>
			{:else}
				<UserDetailsForm course={data.course.Title} />
			{/if}
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
			{#if certificateIssued}
				<Alert.Root>
					<Terminal class="h-4 w-4" />
					<Alert.Title>Heads up!</Alert.Title>
					<Alert.Description>
						The certificate for this course has already been issued.
					</Alert.Description>
				</Alert.Root>
			{:else}
				<UserDetailsForm course={data.course.Title} />
			{/if}
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
