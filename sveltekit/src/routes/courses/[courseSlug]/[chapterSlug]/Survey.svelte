<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { Button } from '$lib/components/ui/button/index.js';
	import SurveyForm from './SurveyForm.svelte';
	import Info from "lucide-svelte/icons/info";

	export let trigger_button: string;
	export let title: string;
	export let description: string;
	export let submit_button: string;
	export let questions;
	export let course: string | null;
	export let courseId: string;
	export let disabled: boolean;

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>



<div class="flex flex-row gap-1">
	{#if $isDesktop}
		<Dialog.Root bind:open>
			<Dialog.Trigger asChild let:builder>
				<Button variant="outline" builders={[builder]} disabled={disabled}>{trigger_button}</Button>
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>{title}</Dialog.Title>
					<Dialog.Description>
						{description}
					</Dialog.Description>
				</Dialog.Header>
				<SurveyForm {questions} {submit_button} {course} {courseId} />
			</Dialog.Content>
		</Dialog.Root>
	{:else}
		<Drawer.Root bind:open>
			<Drawer.Trigger asChild let:builder>
				<Button variant="outline" builders={[builder]} disabled={disabled}>{trigger_button}</Button>
			</Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header class="text-left">
					<Drawer.Title>{title}</Drawer.Title>
					<Drawer.Description>
						{description}
					</Drawer.Description>
				</Drawer.Header>
				<div class="px-4">
					<SurveyForm {questions} {submit_button} {course} {courseId} />
				</div>
				<Drawer.Footer class="pt-2">
					<Drawer.Close asChild let:builder>
						<Button variant="outline" builders={[builder]}>Cancel</Button>
					</Drawer.Close>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	{/if}

	{#if disabled}
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Info size="1.25em" />
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>You need to finish the course!</p>
			</Tooltip.Content>
		</Tooltip.Root>
	{/if}
</div>
