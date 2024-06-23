<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import SortableList from '$lib/components/ui/sortableList/SortableList.svelte';

	export let id: string;
	export let question: string;
	export let answers: { text: string }[];

	answers = answers.map((answer, index) => ({ ...answer, sort: index }));

	// Shuffle the answers array
	answers = answers.sort(() => Math.random() - 0.5);

	let isCorrect: boolean | null = null;

	async function logAnswer() {
		await fetch('/api/analytics/quiz', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				isCorrect,
				incorrectAnswers: isCorrect ? [] : answers
			})
		});
	}

	function handleSort(e: CustomEvent<{ sort: number; text: string }[]>) {
		answers = e.detail;
		isCorrect = null; // Reset isCorrect when the user starts reordering
	}

	function checkOrder() {
		const sortedAnswers = [...answers].sort((a, b) => a.sort - b.sort);
		isCorrect = answers.every((answer, index) => answer.sort === sortedAnswers[index].sort);
		if (!isCorrect) {
			// Reset isCorrect after 3 seconds if the order is incorrect
			setTimeout(() => {
				isCorrect = null;
			}, 3000);
		}
		logAnswer();
	}
</script>

<Card.Root class="inline-block border-0 shadow-none">
	<Card.Header>
		<Card.Title>
			{question}
		</Card.Title>
		<Card.Description>Order the following answers</Card.Description>
		{#if isCorrect === true}
			<div class="inline-block">
				<Badge>Correct</Badge>
			</div>
		{/if}
	</Card.Header>
	<Card.Content>
		<SortableList list={answers} on:sort={handleSort} let:item>
			<Button variant={isCorrect === false ? 'destructive' : 'outline'}>
				{item.text}
			</Button>
		</SortableList>
	</Card.Content>
	<Card.Footer>
		<Button on:click={checkOrder}>Submit</Button>
	</Card.Footer>
</Card.Root>
