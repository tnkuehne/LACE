<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { progressStore } from '$lib/stores/progressStore';

	export let course: string;
</script>

<form
	method="POST"
	use:enhance={() => {
		// This function runs immediately before the form is submitted
		return async ({ result }) => {
			if (result.type === 'redirect') {
				// Update the store to set certificate_issued to true
				await progressStore.issueCertificate(course);
				console.log('Form submitted successfully and certificate issued.');
			}
			// Apply the default behavior
			await applyAction(result);
		};
	}}
>
	<Label for="name">Your name</Label>
	<Input type="text" name="name" placeholder="Name" required />
	<Label for="course">Course name</Label>
	<Input type="text" name="course" value={course} disabled required />
	<Button type="submit" class="mt-4 text-white">Submit</Button>
</form>
