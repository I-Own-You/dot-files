<script>
	// this way you can assign a default value for a prop if there is none provided
	let { answer = "mystery" } = $props();
</script>

<p>The answer is {answer}</p>
