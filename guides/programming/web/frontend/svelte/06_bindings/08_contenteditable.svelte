<script>
	let html = $state('<p>Write some text!</p>');
</script>

<!-- elements with "contenteditable" attribute support textContent and innerHTML bindigs with bind: -->
<div bind:innerHTML={html} contenteditable></div>

<pre>{html}</pre>

<style>
	[contenteditable] {
		padding: 0.5em;
		border: 1px solid #eee;
		border-radius: 4px;
	}
</style>
