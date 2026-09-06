<script>
    import { fade, fly } from 'svelte/transition';

	let visible = $state(true);
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
    <!-- 2. then we use in: and out: directive on p tag
         2.1 an html tag can have eiher :in or :out or both at the same time -->
    <p in:fly={{ y: 200, duration: 2000 }} out:fade>
    	Flies in, fades out
    </p>
{/if}
