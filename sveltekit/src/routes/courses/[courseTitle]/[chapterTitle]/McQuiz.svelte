<script lang="ts">
    import {Button} from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card";
    import {Badge} from "$lib/components/ui/badge";

    export let question: string;
    export let answers: {text: string, correct: boolean, sort: null}[];

    let selectedAnswers: number[] = []; // Explicitly define the type as number[]
    let incorrectAnswers: number[] = []; // Array to store incorrect answers
    let isCorrect: boolean | null = null; // Initialize as null

    function selectAnswer(index: number) { // Explicitly define the type as number
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

    function submitAnswer() {
        // Sort the arrays before comparing, as order doesn't matter
        isCorrect = JSON.stringify(selectedAnswers.sort()) === JSON.stringify(answers.filter(answer => answer.correct).map((_, index) => index));

        // If the answer is incorrect, find the incorrect answers
        if (!isCorrect) {
            incorrectAnswers = selectedAnswers.filter(answer => !answers[answer].correct);
        } else {
            incorrectAnswers = [];
        }
    }
</script>

<Card.Root class="inline-block border-0 shadow-none">
    <Card.Header>
        <Card.Title>
            {question}
        </Card.Title>
        {#if isCorrect}
            <div class="inline-block">
                <Badge>
                    Correct
                </Badge>
            </div>

        {/if}
    </Card.Header>
    <Card.Content>
        <div class="flex flex-col space-y-2 items-start">
            {#each answers as {text}, index}
                <Button
                        variant={incorrectAnswers.includes(index) ? 'destructive' : (selectedAnswers.includes(index) ? 'secondary' : 'outline')}
                        on:click={() => selectAnswer(index)}>
                    {text}
                </Button>
            {/each}
        </div>
    </Card.Content>
    <Card.Footer>
        <Button on:click={submitAnswer}>
            Submit
        </Button>
    </Card.Footer>
</Card.Root>