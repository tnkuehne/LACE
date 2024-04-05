<script lang="ts">
    import {onMount} from 'svelte';
    import getDirectusInstance from '$lib/directus';
    import {readItems} from '@directus/sdk';

    interface Course {
        id: string;
        Title: string;
        Description: string;
    }

    let courses: Course[] = [];

    onMount(async () => {
        courses = await getDirectusInstance().request(readItems('Courses')) as Course[];
    });
</script>

<ul>
    {#each courses as { id, Title }}
        <li>
            <a href={`/courses/${Title}`}>{Title}</a>
        </li>
    {/each}
</ul>
