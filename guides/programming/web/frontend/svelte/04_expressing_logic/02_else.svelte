<script>
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<button onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

<!-- 1. this way you can use if logic inside your component
     2. "#" means you open a block
     3. ":" means you continue a block
     4. "/" means you close a block -->
{#if count % 2 == 0}
	<p>{count} is even</p>
{:else}
    <p>{count} is odd </p>
{/if}
