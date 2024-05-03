<script lang="ts">
    import {Badge} from "$lib/components/ui/badge/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card";
    import {progressStore} from '$lib/stores/progressStore';

</script>

<Card.Root class="inline-block border-0 shadow-none">
    <Card.Header>
        <Card.Title>
            You made it to the end!
        </Card.Title>
    </Card.Header>
    <Card.Content>
        The next chapter is waiting for you. Keep going!
    </Card.Content>
    <Card.Footer>
        <Button>
            Next
        </Button>
    </Card.Footer>
</Card.Root>