<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { toast } from 'svelte-sonner';

	export let id: string;
	export let question: string;
	export let answers: { text: string; correct: boolean }[];

	let selectedAnswers: number[] = [];
	let incorrectAnswers: number[] = [];
	let isCorrect: boolean | null = null;

	function selectAnswer(index: number) {
		const answerIndex = selectedAnswers.indexOf(index);
		if (answerIndex > -1) {
			selectedAnswers.splice(answerIndex, 1);
		} else {
			selectedAnswers.push(index);
		}
		selectedAnswers = selectedAnswers;
		incorrectAnswers = [];
	}

	async function logAnswer() {
		await fetch('/api/analytics/quiz', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				isCorrect,
				incorrectAnswers: incorrectAnswers.map((index) => ({ text: answers[index].text }))
			})
		});
	}

	function submitAnswer() {
		if (selectedAnswers.length === 0) {
			toast.error('Please select at least one answer.');
			return;
		}

		const correctAnswers = answers.filter((answer) => answer.correct);
		const correctIndexes = correctAnswers.map((answer) => answers.indexOf(answer));

		isCorrect = selectedAnswers.length === correctIndexes.length &&
				selectedAnswers.every((index) => correctIndexes.includes(index));

		if (!isCorrect) {
			incorrectAnswers = selectedAnswers.filter(
					(index) => !correctIndexes.includes(index)
			);
			toast.error('Some correct answers are still missing.');
		} else {
			incorrectAnswers = [];
			toast.success('All correct answers selected!');
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
						class="h-auto max-w-xl justify-start whitespace-normal text-left"
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