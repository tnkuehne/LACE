<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { createItem } from '@directus/sdk';
	import getDirectusInstance from '$lib/directus';

	export let id: string;
	export let question: string;
	export let answers: { text: string; correct: boolean }[];

	let selectedAnswers: number[] = []; // Explicitly define the type as number[]
	let incorrectAnswers: number[] = []; // Array to store incorrect answers
	let isCorrect: boolean | null = null; // Initialize as null

	function selectAnswer(index: number) {
		// Explicitly define the type as number
		// This function now toggles the selection of an answer
		const answerIndex = selectedAnswers.indexOf(index);
		if (answerIndex > -1) {
			selectedAnswers.splice(answerIndex, 1);
		} else {
			selectedAnswers.push(index);
		}
		selectedAnswers = selectedAnswers; // Trigger Svelte reactivity
		incorrectAnswers = []; // Clear incorrect answers when a new answer is selected
	}

	async function logAnswer() {
		await getDirectusInstance().request(
			createItem('quiz_data', {
				quiz: id,
				correct: isCorrect,
				wrong: incorrectAnswers.map((index) => ({ text: answers[index].text }))
			})
		);
	}

	function submitAnswer() {
		// If no answers are selected, do nothing
		if (selectedAnswers.length === 0) {
			return;
		}

		// Get the correct answers
		const correctAnswers = answers.filter((answer) => answer.correct);

		// Check if the selected answers are correct
		isCorrect = selectedAnswers.every((index) => correctAnswers.includes(answers[index]));

		// If the answer is incorrect, find the incorrect answers
		if (!isCorrect) {
			incorrectAnswers = selectedAnswers.filter(
				(index) => !correctAnswers.includes(answers[index])
			);
		} else {
			incorrectAnswers = [];
		}

		logAnswer();
	}
</script>

<Card.Root class="inline-block border-0 shadow-none">
	<Card.Header>
		<Card.Title>
			{question}
		</Card.Title>
		{#if isCorrect}
			<div class="inline-block">
				<Badge>Correct</Badge>
			</div>
		{/if}
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col items-start space-y-2">
			{#each answers as { text }, index}
				<Button
					variant={incorrectAnswers.includes(index)
						? 'destructive'
						: selectedAnswers.includes(index)
							? 'secondary'
							: 'outline'}
					on:click={() => selectAnswer(index)}
				>
					{text}
				</Button>
			{/each}
		</div>
	</Card.Content>
	<Card.Footer>
		<Button on:click={submitAnswer}>Submit</Button>
	</Card.Footer>
</Card.Root>
