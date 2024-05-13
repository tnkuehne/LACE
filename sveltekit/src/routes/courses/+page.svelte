<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { env } from '$env/dynamic/public';

	export let data;
</script>

{#if data.courses.length > 0}
	<div class="flex flex-row place-content-center gap-4">
		{#each data.courses as course}
			<Card.Root>
				<Card.Header>
					<Card.Title>{course.Title}</Card.Title>
					<Card.Description>{course.Description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<img
						src={`${env.PUBLIC_APIURL}/assets/${course.Image}?width=200`}
						alt="Slide {course.Title}"
					/>
				</Card.Content>
				<Card.Footer class="justify-end">
					<Button href={`/courses/${course.Title}`}>Start</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
{:else}
	<p>No courses available.</p>
{/if}
