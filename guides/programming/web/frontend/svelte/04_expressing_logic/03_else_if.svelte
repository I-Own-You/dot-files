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
{:else if count == 3}
    <p>Congratuilation!! You found the number between epsilon and pi: {count}</p>
    <p>explanation: epsilon is 2.72xxxxxx and pi is 3.14xxxxx</p>
{:else}
    <p>{count} is odd </p>
{/if}
