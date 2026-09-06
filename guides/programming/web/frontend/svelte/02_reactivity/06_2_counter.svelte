<script>
	// notice the .svelte in front of .js
	import { counter } from './06_3_shared.svelte.js';
</script>

<button onclick={() => counter.count += 1}>
	clicks: {counter.count}
</button>
