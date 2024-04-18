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

    function handleSort(e: CustomEvent<{ id: number; name: string; }[]>) {
        countries = e.detail;
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
    </Card.Header>
    <Card.Content>
        <SortableList list={countries} on:sort={handleSort}  let:item let:index>
            <Button variant="outline">
                {item.name}
            </Button>
        </SortableList>
    </Card.Content>
    <Card.Footer>
        <Button>
            Submit
        </Button>
    </Card.Footer>
</Card.Root>