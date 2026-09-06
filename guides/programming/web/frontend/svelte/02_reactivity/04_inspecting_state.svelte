<script>
	let numbers = $state([1, 2, 3, 4]);
	let total = $derived(numbers.reduce((t, n) => t + n, 0));

	function addNumber() {
		numbers.push(numbers.length + 1);
		// 1. if you want to inspect a state value, you will get warnings using console.log() since
		//    a state value is a "reactive proxy", so you either use $inspect() or $state.snapshot()
		// console.log(numbers); // no errors but warnings
		// 2. $state.snapshot() - creates a non-reactive snapshot of the state
		console.log($state.snapshot(numbers))
		// 3. $inspect() - automatically logs a snapshot of the state whenever it changes
		// 3.1 $inspect() will not be part of production code though, it will be removed
	}

    // 3.2 $inspect() must be placed inside an "effect" or on component initialization,
    //     this is why its at the root component scope and placed at the bottom since
    //     placing it after initialization of the state value it inspect could lead
    //     to multiple prints or issues related to render orders
    $inspect(numbers);
    // 3.3 you can customize the output of it using .with(fn) method on it
    // $inspect(numbers).with(console.trace);
</script>

<p>{numbers.join(' + ')} = {total}</p>

<button onclick={addNumber}>
	Add a number
</button>
