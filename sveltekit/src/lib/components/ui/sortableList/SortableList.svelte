<script lang="ts">
	import { flip } from 'svelte/animate';
	import { createEventDispatcher } from 'svelte';

	export let list: any[];
	let isOver: string | boolean = false;

	const dispatch = createEventDispatcher();

	function getDraggedParent(node: any) {
		if (!node.dataset.index) {
			return getDraggedParent(node.parentNode);
		} else {
			return { ...node.dataset };
		}
	}

	function onDragStart(e: DragEvent) {
		// @ts-ignore
		const dragged = getDraggedParent(e.target);
		e.dataTransfer?.setData('source', dragged?.index.toString());
	}

	function onDragOver(e: DragEvent) {
		// @ts-ignore
		const sort = e.target.dataset?.sort;
		const dragged = getDraggedParent(e.target);
		isOver = dragged?.sort ?? false;
	}

	function onDragLeave(e: DragEvent) {
		const dragged = getDraggedParent(e.target);
		isOver === dragged.sort && (isOver = false);
	}

	function onDrop(e: DragEvent) {
		isOver = false;
		const dragged = getDraggedParent(e.target);
		reorder({
			from: e.dataTransfer?.getData('source'),
			to: dragged.index
		});
	}

	const reorder = ({ from, to }: any) => {
		const newList = [...list];
		newList[from] = [newList[to], (newList[to] = newList[from])][0];

		dispatch('sort', newList);
	};
</script>

{#if list?.length}
	<ul class="flex list-none flex-col items-center p-0">
		{#each list as item, index (item.sort)}
			<li
				class="w-full max-w-md border-2 border-dashed border-transparent p-2 transition-all"
				class:over={item.sort === isOver}
				data-index={index}
				data-sort={item.sort}
				draggable="true"
				on:dragstart={onDragStart}
				on:dragover|preventDefault={onDragOver}
				on:dragleave={onDragLeave}
				on:drop|preventDefault={onDrop}
				animate:flip={{ duration: 300 }}
			>
				<slot {item} {index} />
			</li>
		{/each}
	</ul>
{:else}
	<p class="my-12 text-center text-lg font-bold">No items</p>
{/if}

<style>
	.over {
		@apply scale-105 border-gray-400;
	}
</style>
