<script lang="ts">
    export let data;
</script>

{#if data.courses.length > 0}
    <ul>
        {#each data.courses as course}
            <li>
                <a href={`/courses/${course.Title}`}>{course.Title}</a>
            </li>
        {/each}
    </ul>
{:else}
    <p>No courses available.</p>
{/if}
