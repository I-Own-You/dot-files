<script>
	let numbers = $state([1, 2, 3, 4]);

    // 1. you can derive from another state and make somethin else reactive based on that state
    // 2. "totoal" will be reactive and will change once its dependencies change too
    // 3. if "numbers"(dependency, since its a reactive value) change, code within
    //    $derived(...) will execute, this happens everytime dependecny changes
    let total = $derived(numbers.reduce((t, n) => t + n, 0));
    // 4. of course you could have "total" without being reactive and then update it
    //    inside addNumber() function and use a side effect where "numbers" changing will
    //    cause a rerender and since "total" is updated, html will update it too but this
    //    would require you additional code and keeping track of it, not good.

	function addNumber() {
		numbers.push(numbers.length + 1);
	}
</script>

<p>{numbers.join(' + ')} = {total}</p>

<button onclick={addNumber}>
	Add a number
</button>
