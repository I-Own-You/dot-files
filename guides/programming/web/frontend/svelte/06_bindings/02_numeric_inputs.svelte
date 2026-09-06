<script>
	let a = $state(1);
	let b = $state(2);
</script>

<!-- 1. in DOM, every input value is "string"
     2. but if you work with numeric types or range on an input, it would need an
        explicit work to assign a numeric value
     3. :bind directive does this for us -->
<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>
