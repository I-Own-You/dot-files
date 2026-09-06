<script>
	const emojis = {
		apple: '🍎',
		banana: '🍌',
		carrot: '🥕',
		doughnut: '🍩',
		egg: '🥚'
	};

	// name is updated whenever the prop value changes...
	let { name } = $props();

	// emoji is fixed upon initialization, no changing ever
	const emoji = emojis[name];

</script>

<p>{emoji} = {name}</p>
