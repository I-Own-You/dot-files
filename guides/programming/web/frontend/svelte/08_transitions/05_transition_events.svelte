<script>
	import { fly } from 'svelte/transition';

	let visible = $state(true);
	let status = $state('waiting...');
</script>

<p>status: {status}</p>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
    <!-- svelte dispatches events on a html tag when a transition happens which you can
         listen on and do something with it -->
	<p
		transition:fly={{ y: 200, duration: 2000 }}
        onintrostart={() => status = 'intro started'}
    	onoutrostart={() => status = 'outro started'}
    	onintroend={() => status = 'intro ended'}
    	onoutroend={() => status = 'outro ended'}
	>
		Flies in and out
	</p>
{/if}
