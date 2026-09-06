<script>
	import { fly } from 'svelte/transition';

	let visible = $state(true);
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
    <!-- 2. then we use fly function and pass it arguments, in our case an object with 2 properties -->
    <p transition:fly={{ y: 200, duration: 2000 }}>
    	Flies in and out
    </p>
{/if}
