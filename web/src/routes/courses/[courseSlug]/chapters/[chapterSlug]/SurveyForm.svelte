<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import { enhance } from '$app/forms';
	import { env } from '$env/dynamic/public';

	export let questions;
	export let submit_button: string;
	export let course: string | null;
	export let courseId: string;

	const likertScale = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];

	let groupedQuestions = questions.reduce((grouped, question) => {
		(grouped[question.section] = grouped[question.section] || []).push(question);
		return grouped;
	}, {});

	let sections = Object.keys(groupedQuestions);
	let selectedValues = {};
	let currentPage = 0;

	function handleSelectChange(question, value) {
		selectedValues[question] = value;
	}

	function nextPage() {
		if (currentPage < sections.length - 1) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 0) {
			currentPage--;
		}
	}

	function handleInputChange(event, question) {
		selectedValues[question] = event.target.value;
	}
</script>

<form
		class="grid items-start gap-4 pr-4"
		action={`${env.PUBLIC_WEB_URL}/courses/${course}/survey?course=${courseId}`}
		method="POST"
		use:enhance
>
	{#each sections as section, sectionIndex}
		<div class:hidden={currentPage !== sectionIndex}>
			<h2 class="font-medium underline">{section}</h2>
			{#each groupedQuestions[section] as question}
				{#if question.course === course || question.course == null}
					<div class="pt-4">
						<Label for={question.question}>{question.question}</Label>
						{#if question.type === 'open'}
                            <Textarea
									id={question.question}
									name={question.question}
									required={question.required}
									value={selectedValues[question.question] || ''}
									on:input={(e) => handleInputChange(e, question.question)}
							/>
						{/if}
						{#if question.type === 'likert'}
							<div class="flex flex-col pt-2">
								<div class="flex flex-row justify-between">
									{#each likertScale as option, index}
										<div>
											<input
													type="radio"
													id={`${question.question}_${index}`}
													name={question.question}
													value={option}
													required={question.required}
													checked={selectedValues[question.question] === option}
													on:change={(e) => handleInputChange(e, question.question)}
											/>
											<label for={`${question.question}_${index}`} class="sr-only">{option}</label>
										</div>
									{/each}
								</div>
								<div class="flex flex-row justify-between">
									<span class="text-sm">Strongly disagree</span>
									<span class="text-sm">Strongly agree</span>
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

	<div class="flex justify-between mt-4">
		<Button type="button" on:click={prevPage} disabled={currentPage === 0} class="text-secondary">Previous</Button>
		{#if currentPage === sections.length - 1}
			<Button type="submit" class="text-secondary">{submit_button}</Button>
		{:else}
			<Button type="button" on:click={nextPage} class="text-secondary">Next</Button>
		{/if}
	</div>
</form>