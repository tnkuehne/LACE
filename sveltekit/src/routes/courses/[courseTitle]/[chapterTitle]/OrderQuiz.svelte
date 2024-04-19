<script lang="ts">
    import {Badge} from "$lib/components/ui/badge/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card";
    import SortableList from "$lib/components/ui/sortableList/SortableList.svelte";

    export let question: string;
    export let answers: {sort: number, text: string}[];

    // Shuffle the answers array
    answers = answers.sort(() => Math.random() - 0.5);

    let isCorrect: boolean | null = null;

    function handleSort(e: CustomEvent<{ sort: number; text: string; }[]>) {
        answers = e.detail;
        isCorrect = null; // Reset isCorrect when the user starts reordering
    }

    function checkOrder() {
        const sortedAnswers = [...answers].sort((a, b) => a.sort - b.sort);
        isCorrect = JSON.stringify(answers) === JSON.stringify(sortedAnswers);
        if (!isCorrect) {
            // Reset isCorrect after 3 seconds if the order is incorrect
            setTimeout(() => {
                isCorrect = null;
            }, 3000);
        }
    }
</script>

<Card.Root class="inline-block">
    <Card.Header>
        <Card.Title>
            {question}
        </Card.Title>
        <Card.Description>
            Order the following answers
        </Card.Description>
        {#if isCorrect === true}
            <div class="inline-block">
                <Badge>
                    Correct
                </Badge>
            </div>
        {/if}
    </Card.Header>
    <Card.Content>
        <SortableList list={answers} on:sort={handleSort} let:item let:index>
            <Button variant={isCorrect === false ? 'destructive' : 'outline'}>
                {item.text}
            </Button>
        </SortableList>
    </Card.Content>
    <Card.Footer>
        <Button on:click={checkOrder}>
            Submit
        </Button>
    </Card.Footer>
</Card.Root>