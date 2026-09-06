<script>
	let elapsed = $state(0);
	let interval = $state(1000);

    // 1. effect() is the thing that reacts to some state changes and runs on every render
    // 2. if effect() doenst read any state when it runs, it will run only once on component mount
	$effect(() => {
		const id = setInterval(() => {
	        elapsed += 1;
		}, interval);

        // 1. this is a "clean up function" which runs:
        //      1. before every effect() re-run
        //      2. when component is destroyed
		return () => {
		    clearInterval(id);
		}
	});
</script>

<!-- notice the fact that we used not a function name to assign an event handler to onclick
     but an anonymous arrow function, this is usually used when you dont want
     a separate function block but just some code in place -->
<button onclick={() => interval /= 2}>speed up</button>
<button onclick={() => interval *= 2}>slow down</button>

<p>elapsed: {elapsed}</p>

<!-- tip: effect is an escape way of doing something, you are better of using event handlers
         where you alter your state as we did before than using effect for it -->
<!-- tip: effects do not run during ssr -->
