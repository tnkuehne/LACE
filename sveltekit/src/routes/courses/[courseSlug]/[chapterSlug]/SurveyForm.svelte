<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { enhance } from '$app/forms';

	export let questions;
	export let submit_button: string;
	export let course: string | null;
	export let courseId: string;

	const likertScale = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];
</script>

<form
	class="grid items-start gap-4"
	action="/courses/{course}/survey?course={courseId}"
	method="POST"
	use:enhance
>
	{#each questions as question}
		{#if question.course === course || question.course == null}
			<div>
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
			</div>
		{/if}
	{/each}
	<Button type="submit">{submit_button}</Button>
</form>
