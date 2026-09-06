<script>
	import { slide } from 'svelte/transition';

	let items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

	let showItems = $state(true);
	let i = $state(5);
</script>

<label>
	<input type="checkbox" bind:checked={showItems} />
	show list
</label>

<label>
	<input type="range" bind:value={i} max="10" />
</label>

{#if showItems}
	{#each items.slice(0, i) as item}
	    <!-- 1. transitions play only on elements when their direct block is added/destroyed, it
			    will not play when its childs are added/destroyed, but what if we want to
			    play transition when childs are added/destroyed and also when we toggle checkbox
				no matter if checkbox is a child of a parent with transition or not ?
			 2. we can, by using |global after the transition function like this:
				        <div transition:slide|global></div> -->
		<div transition:slide|global>
			{item}
		</div>
	{/each}
{/if}

<style>
	div {
		padding: 0.5em 0;
		border-top: 1px solid #eee;
	}
</style>
