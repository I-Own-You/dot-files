<script>
	// import { marked } from 'marked';

	let value = $state(`Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`);
</script>

<div class="grid">
	input
	<textarea bind:value={value}></textarea>
	<!-- when name of the reactive value matches the "value" attribute on any tag (input, select, .etc)
	     we can use bind:value without = {value}, like this:
		 <textarea bind:value></textarea> -->

	output
	<!-- <div>{@html marked(value)}</div> -->
	<div>{@html value}</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 5em 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1em;
		height: 100%;
	}

	textarea {
		flex: 1;
		resize: none;
	}
</style>
