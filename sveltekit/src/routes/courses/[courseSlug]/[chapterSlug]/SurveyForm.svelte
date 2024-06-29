<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import { enhance } from '$app/forms';

	export let questions;
	export let submit_button: string;
	export let course: string | null;
	export let courseId: string;

	const likertScale = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];

	let groupedQuestions = questions.reduce((grouped, question) => {
		(grouped[question.section] = grouped[question.section] || []).push(question);
		return grouped;
	}, {});

	let sections = Object.keys(groupedQuestions);
	let selectedValues = {};

	function handleSelectChange(question, value) {
		selectedValues[question] = value;
	}
</script>

<form
	class="grid items-start gap-4"
	action="/courses/{course}/survey?course={courseId}"
	method="POST"
	use:enhance
>
	{#each sections as section}
		<div>
			<h2 class="font-medium underline">{section}</h2>
			{#each groupedQuestions[section] as question}
				{#if question.course === course || question.course == null}
					<div class="pt-4">
						<Label>{question.question}</Label>
						{#if question.type === 'open'}
							<Textarea name={question.question} required={question.required} />
						{/if}
						{#if question.type === 'likert'}
							<div class="flex flex-col pt-2">
								<div class="flex flex-row justify-between">
									{#each likertScale as option}
										<input
											type="radio"
											name={question.question}
											value={option}
											required={question.required}
										/>
									{/each}
								</div>
								<div class="flex flex-row justify-between">
									<span class="text-sm">Strongly agree</span>
									<span class="text-sm">Strongly disagree</span>
								</div>
							</div>
						{/if}
						{#if question.type.includes(';')}
							<Select.Root onSelectedChange={(e) => handleSelectChange(question.question, e.value)}>
								<Select.Trigger class="w-[180px]">
									<Select.Value placeholder="Options" />
								</Select.Trigger>
								<Select.Content>
									{#each question.type.split(';') as option}
										<Select.Item value={option}>{option}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<input
								type="hidden"
								name={question.question}
								value={selectedValues[question.question] || ''}
							/>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	{/each}
	<Button type="submit" class="light:text-white">{submit_button}</Button>
</form>
