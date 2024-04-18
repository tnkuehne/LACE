<script lang="ts">
    import {Badge} from "$lib/components/ui/badge/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card";
    import SortableList from "$lib/components/ui/sortableList/SortableList.svelte";

    let countries = [
        {id: 1, name: 'Russia'},
        {id: 2, name: 'Canada'},
        {id: 3, name: 'China'},
        {id: 4, name: 'United States'},
        {id: 5, name: 'Brazil'}
    ];

    // Shuffle the countries array
    countries = countries.sort(() => Math.random() - 0.5);

    let isCorrect: boolean | null = null;

    function handleSort(e: CustomEvent<{ id: number; name: string; }[]>) {
        countries = e.detail;
        isCorrect = null; // Reset isCorrect when the user starts reordering
    }

    function checkOrder() {
        const sortedCountries = [...countries].sort((a, b) => a.id - b.id);
        isCorrect = JSON.stringify(countries) === JSON.stringify(sortedCountries);
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
            Which are the five biggest countries in the world?
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
        <SortableList list={countries} on:sort={handleSort} let:item let:index>
            <Button variant={isCorrect === false ? 'destructive' : 'outline'}>
                {item.name}
            </Button>
        </SortableList>
    </Card.Content>
    <Card.Footer>
        <Button on:click={checkOrder}>
            Submit
        </Button>
    </Card.Footer>
</Card.Root>