<script>
	import { roll } from './06_2_nested.js';

	let promise = $state(roll());
</script>

<button onclick={() => promise = roll()}>
	roll the dice
</button>

<!-- 1. this way, svelte provides an easy way to await promises,
     2. :then block will fire if promise fulfilled
     3. :catch block will fire if promise rejected -->
{#await promise}
    <!-- this is displayed until promises either reject/fulfil -->
	<p>...rolling</p>
{:then number}
	<p>you rolled a {number}!</p>
<!-- 4. you can skip :catch block if you know promise cannot reject -->
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
<!-- 5. you can also skip all blocks inside #await entirely and do something only
     if the promise fulfilled but you lose the ability to display something while you wait -->
{#await promise then number}
	<p>you rolled a {number}!</p>
{/await}
