<script>
    // 1. first we import the fade function from svelte
	import { fade } from 'svelte/transition';

	let visible = $state(true);
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
    <!-- 2. then we use tranisiton: directive with fade function to beautifully fade
            the p tag -->
	<p transition:fade>
		Fades in and out
	</p>
{/if}
