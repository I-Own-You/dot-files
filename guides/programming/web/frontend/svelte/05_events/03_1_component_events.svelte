<script>
	import Stepper from './03_2_nested.svelte';

	let value = $state(0);
</script>

<p>The current value is {value}</p>

<!-- you can pass event handler as props as well, in our case we pass a function which
     updates the parent state "value" -->
<Stepper
	increment={() => value += 1}
	decrement={() => value -= 1}
/>
