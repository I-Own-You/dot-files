<script>
    // 1. svelte provides some reactive builtin classes you can work with, some of them:
    //           Map, Set, Date, URL, URLSearchParams
	import { SvelteDate } from 'svelte/reactivity';
    //
	// 2. yes, we could wrap date inside a $state()
	// let date = $state(new Date());
	//
	// 3. but svelte already provides some reactive builtin classes you can work with
	let date = new SvelteDate();

	const pad = (n) => n < 10 ? '0' + n : n;

	$effect(() => {
		const interval = setInterval(() => {
			date.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<p>The time is {date.getHours()}:{pad(date.getMinutes())}:{pad(date.getSeconds())}</p>
