<script lang="ts">
    import {goto} from '$app/navigation';
    import {Badge} from "$lib/components/ui/badge/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card";
    import {progressStore} from '$lib/stores/progressStore';

    export let nextChapterUrl = '';

    function navigateToNextChapter() {
        if (nextChapterUrl) {
            goto(nextChapterUrl);
        } else {
            goto('/'); // Navigate to home page or course list
        }
    }
</script>

<Card.Root class="inline-block border-0 shadow-none">
    <Card.Header>
        <Card.Title>
            {#if nextChapterUrl}
                You made it to the end!
            {:else}
                Congratulations, you've completed all chapters!
            {/if}
        </Card.Title>
    </Card.Header>
    <Card.Content>
        {#if nextChapterUrl}
            The next chapter is waiting for you. Keep going!
        {:else}
            You've completed all chapters. You can review the course or start a new one.
        {/if}
    </Card.Content>
    <Card.Footer>
        <Button on:click={navigateToNextChapter}>
            {#if nextChapterUrl}
                Next
            {:else}
                Back to Courses
            {/if}
        </Button>
    </Card.Footer>
</Card.Root>