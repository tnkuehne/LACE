<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Globe from 'lucide-svelte/icons/globe';
	import * as Table from '$lib/components/ui/table';

	export let references;
</script>

<Card.Root>
	<Card.Header class="bg-blue-100 dark:bg-blue-900">
		<Card.Title>
			<div class="flex flex-row items-center">
				<Globe class="mr-2 h-6 w-6 fill-blue-300 stroke-blue-700 stroke-1" />
				References
			</div>
		</Card.Title>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Caption
				>Note: The sources marked in purple are ideal for further reading, particularly for a
				non-technical audience.</Table.Caption
			>
			<Table.Body>
				{#each references as reference, i (i)}
					<Table.Row>
						<Table.Cell class="">
							{#if reference.link}
								<a
									href={reference.link}
									class="{reference.reading ? 'text-purple-700' : ''} hover:text-primary"
									>{reference.text}</a
								>
							{:else}
								<span class={reference.reading ? 'text-purple-700' : ''}>{reference.text}</span>
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
