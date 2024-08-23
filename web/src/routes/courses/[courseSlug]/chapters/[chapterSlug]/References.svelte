<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import Globe from 'lucide-svelte/icons/globe';
    import * as Table from "$lib/components/ui/table";

    //export let references;

    const references = [
        {
            text: "A. Shteyn, K. Kollnig, and C. Inverarity. Federated learning: an introduction. Tech. rep. Open Data Institute, 2023.",
            link: "https://www.theodi.org/article/federated-learning-an-introduction-report/.",
            reading: true
        },
        {
            text: "M. Aledhari, R. Razzak, R. M. Parizi, and F. Saeed. “Federated learning: A survey on enabling technologies, protocols, and applications”. \n" +
                "In: IEEE Access 8 (2020), pp.140699– 140725. doi: 10.1109/ACCESS.2020.3013541",
            link: null,
            reading: true
        },
        {
            text: "B. McMahan, E. Moore, D. Ramage, S. Hampson, and B. A. y Arcas. “Communication-efficient learning of deep networks from decentralized data”. In: Proceedings of the 20th International Conference on Artificial Intelligence and Statistics. Vol. 54. PMLR. 2017, pp. 1273–1282.",
            link: "https://proceedings.mlr.press/v54/mcmahan17a.html.",
            reading: false
        },
        {
            text: "W. Y. B. Lim, N. C. Luong, D. T. Hoang, Y. Jiao, Y.-C. Liang, Q. Yang, D. Niyato, and C. Miao. “Federated learning in mobile edge networks: A comprehensive survey”. In: IEEE Communications Surveys & Tutorials 22.3 (2020), pp. 2031–2063. doi: 10.1109/COMST.2020.2986024.",
            link: null,
            reading: false
        },
        {
            text: "M. Aledhari, R. Razzak, R. M. Parizi, and F. Saeed. “Federated learning: A survey on enabling technologies, protocols, and applications”. \n" +
                "In: IEEE Access 8 (2020), pp. 140699–140725.  doi: 10.1109/ACCESS.2020.3013541.",
            link: null,
            reading: false
        },
        {
            text: "T. Li, A. K. Sahu, A. Talwalkar, and V. Smith. “Federated learning: Challenges, methods, and future directions”. In: IEEE signal processing magazine 37.3 (2020), pp. 50–60. doi: 10.1109/MSP.2020.2975749.",
            link: null,
            reading: true
        }
    ];

</script>

<Card.Root>
    <Card.Header class="bg-blue-100">
        <Card.Title>
            <div class="flex flex-row items-center">
                <Globe class="h-6 w-6 mr-2 fill-blue-300 stroke-blue-700 stroke-1" />
                References
            </div>
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <Table.Root>
            <Table.Caption>Note: The sources marked in purple are ideal for further reading, particularly for a non-technical audience.</Table.Caption>
            <Table.Body>
                {#each references as reference, i (i)}
                    <Table.Row>
                        <Table.Cell class="">
                            {#if reference.link}
                                <a href={reference.link} class="{reference.reading ? 'text-purple-700' : ''} hover:text-primary">{reference.text}</a>
                            {:else}
                                <span class="{reference.reading ? 'text-purple-700' : ''}">{reference.text}</span>
                            {/if}
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </Card.Content>
</Card.Root>