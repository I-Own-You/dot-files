<script>
	let {increment, decrement} = $props();
</script>

<!-- here, we assign the props which are event handlers passed from parent component
     which changes its state "value" variable -->
<button onclick={decrement}>-1</button>
<button onclick={increment}>+1</button>
