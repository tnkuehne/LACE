<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from 'bits-ui';
	import Check from 'lucide-svelte/icons/check';
	import Circle from "lucide-svelte/icons/circle";
	import { cn } from '$lib/utils.js';

	type $$Props = CheckboxPrimitive.Props;
	type $$Events = CheckboxPrimitive.Events;

	let className: $$Props['class'] = undefined;
	export let checked: $$Props['checked'] = false;
	export { className as class };

	$: isIndeterminate = checked === 'indeterminate';
</script>

<CheckboxPrimitive.Root
	class={cn(
		'peer box-content h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-blue-200 data-[state=indeterminate]:dark:border-blue-600 data-[state=indeterminate]:border-2',
		className
	)}
	bind:checked
	data-indeterminate={isIndeterminate}
	{...$$restProps}
	on:click
>
	<CheckboxPrimitive.Indicator
		class={cn('flex h-4 w-4 items-center justify-center text-current')}
	>
		{#if isIndeterminate}
			<Circle class="h-3 w-3 stroke-primary stroke-[7px] fill-white dark:fill-primary-foreground" />
		{:else}
			<Check class="h-3.5 w-3.5 stroke-white dark:stroke-black" />
		{/if}
	</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
