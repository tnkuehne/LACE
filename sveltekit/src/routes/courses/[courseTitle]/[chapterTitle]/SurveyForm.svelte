<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	export let questions;
	export let submit_button: string;
	export let course: string | null;
</script>

<form class="grid items-start gap-4" action="/courses/{course}/survey" method="POST">
	{#each questions as question}
		{#if question.course === course || question.course == null}
			<div class="grid gap-2">
				<Label>{question.question}</Label>
				{#if question.type === 'open'}
					<Textarea name={question.question} />
				{/if}
				{#if question.type === 'likart'}
					<RadioGroup.Root value="option-one" class="flex flex-col">
						<div class="flex flex-row justify-between">
							<Label for="option-one">Strongly agree</Label>
							<Label for="option-two">Strongly disagree</Label>
						</div>
						<div class="flex flex-row justify-between">
							<RadioGroup.Item value="option-one" id="option-one" />
							<RadioGroup.Item value="option-two" id="option-two" />
							<RadioGroup.Item value="option-three" id="option-three" />
							<RadioGroup.Item value="option-four" id="option-four" />
							<RadioGroup.Item value="option-five" id="option-five" />
						</div>
					</RadioGroup.Root>
				{/if}
			</div>
		{/if}
	{/each}
	<Button type="submit">{submit_button}</Button>
</form>
