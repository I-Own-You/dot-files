<script>
	import { count } from './04_3_shared.js';
</script>

<!-- 1. since you are in component, you can still reference to "count" by prepedning "$"
        and modifying it
     2. but if you were outside a component, for example in 04_3_shared.js, you could mutate
        "count" programatically by accessing .set or .update methods of "count" like so:
                count.set(n+1);
                count.update((n) => n + 1); -->
<button onclick={() => $count += 1}>
	<!-- since we made "count" writable with svelte store, we can access it by prepedning $
	     in front of the variable name -->
	clicks: {$count}
</button>
