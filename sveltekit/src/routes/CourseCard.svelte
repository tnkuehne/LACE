<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button/index.js";
    import WandSparkles from "lucide-svelte/icons/wand-sparkles";
</script>

<Card.Root class="flex flex-col justify-center items-center">
    <Card.Header>
        <Card.Title>
            <div class="bg-orange-200 rounded-lg h-16 w-16 flex justify-center items-center">
                <WandSparkles class="h-6 w-6 stroke-orange-500"/>
            </div>
        </Card.Title>
    </Card.Header>
    <Card.Content class="flex flex-col justify-center items-center">
        <Card.Description class="text-3xl text-black font-bold">Basics of PETs for Non-technical</Card.Description>
        <p class="text-gray-500">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed</p>
    </Card.Content>
    <Card.Footer>
        <Button variant="link">Learn More 🡢</Button>
    </Card.Footer>
</Card.Root>