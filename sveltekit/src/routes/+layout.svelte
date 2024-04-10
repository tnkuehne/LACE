<script>
	import '../app.pcss';
    import {progressStore} from "$lib/stores/progressStore";

    progressStore.initialize();
</script>

<slot />
