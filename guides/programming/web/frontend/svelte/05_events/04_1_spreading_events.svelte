<script>
	import BigRedButton from './04_2_nested.svelte';

	function greeting() {
		alert("Hello!");
	}
</script>

<!-- we can pass event handlers as props directly onto child components rather than
     passing only the function name -->
<BigRedButton onclick={greeting} />
