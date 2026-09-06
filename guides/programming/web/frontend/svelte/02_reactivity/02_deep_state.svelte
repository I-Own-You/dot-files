<script>
    // 1. reactivity is affected also by "deep reactivity", for example an array
    //    can change inside but not as a variable, svelte will still react to it
	let numbers = $state([1, 2, 3, 4]);

	function addNumber() {
		numbers.push(numbers.length + 1);
		// or
		// numbers[numbers.length] = numbers.length + 1;
		// or
		// numbers[0] = 10;
		// or whatever will mutate the array
	}
</script>

<p>{numbers.join(' + ')} = ...</p>

<button onclick={addNumber}>
	Add a number
</button>

<!-- tip: 1. deep reactivity is implemeted as proxies
          2. mutations to the proxy do not affect the original object -->
