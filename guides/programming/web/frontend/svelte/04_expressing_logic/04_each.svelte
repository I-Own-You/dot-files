<script>
	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = $state(colors[0]);
</script>

<h1 style="color: {selected}">Pick a colour</h1>

<!-- this is kind of tedious right ? having to duplicate something that could be
     easily done with a loop... -->
<div>
	<button
		style="background: red"
		aria-label="red"
		aria-current={selected === 'red'}
		onclick={() => selected = 'red'}
	></button>

	<button
		style="background: orange"
		aria-label="orange"
		aria-current={selected === 'orange'}
		onclick={() => selected = 'orange'}
	></button>

	<button
		style="background: yellow"
		aria-label="yellow"
		aria-current={selected === 'yellow'}
		onclick={() => selected = 'yellow'}
	></button>

	<button
		style="background: green"
		aria-label="green"
		aria-current={selected === 'green'}
		onclick={() => selected = 'green'}
	></button>

	<button
		style="background: blue"
		aria-label="blue"
		aria-current={selected === 'blue'}
		onclick={() => selected = 'blue'}
	></button>

	<button
		style="background: indigo"
		aria-label="indigo"
		aria-current={selected === 'indigo'}
		onclick={() => selected = 'indigo'}
	></button>

	<button
		style="background: violet"
		aria-label="violet"
		aria-current={selected === 'violet'}
		onclick={() => selected = 'violet'}
	></button>
</div>

<!-- and you can, using "each" template tag -->
<div>
    <!-- 1. "colors" after "#each" can be any iterable or array-like object so
            anything that works with Array.from -->
    <!-- 2. #each block also lets you have the current index in the loop by specifying
            any name after "color" like so: {#each colors as color, index} -->
	{#each colors as color}
		<button
			style="background: {color}"
			aria-label={color}
			aria-current={selected === color}
			onclick={() => selected = color}
		></button>
	{/each}
</div>

<style>
	h1 {
		font-size: 2rem;
		font-weight: 700;
		transition: color 0.2s;
	}

	div {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		max-width: 400px;
	}

	button {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: translate(-2px,-2px);
		filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
		transition: all 0.1s;
		color: black;
		font-weight: 700;
		font-size: 2rem;
	}

	button[aria-current="true"] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
	}
</style>
