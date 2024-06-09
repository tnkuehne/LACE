<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';

	export let course: string;
</script>

<form method="POST" use:enhance>
	<Label for="name">Your name</Label>
	<Input type="text" name="name" placeholder="Name" required />
	<Label for="course">Course name</Label>
	<Input type="text" name="course" value={course} disabled required />
	<Button type="submit" class="mt-4 text-white">Submit</Button>
</form>
