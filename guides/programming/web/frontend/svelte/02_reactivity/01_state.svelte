<script>
    // 1. this variable, although can be incremented, it will not trigger a rerender for thml
    //    to shows the updated value
	let count = 0;

	function increment() {
		count += 1;
	}

	// 2. but, by wrapping a value with a rune(like a function but actually part of the svelte)
	//    you can make it reactive(which means html will react to this value changes)
    let reactive_count = $state(0);

	function increment_reactive_value() {
	    reactive_count += 1;
	}

</script>

<button onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
<-- you can notice we assigned a function name without invoking it to a html tag attribute,
    in our case "onclick" will invoke our function every time we click on this button -->
<button onclick={increment_reactive_value}>
	Clicked {reactive_count}
	{reactive_count === 1 ? 'time' : 'times'}
</button>

<!-- actually, we have a side effect which can be useful or can be awful, we have both
     counters, non-reactive and reactive, while incrementing only the reactive one,
     everyting is fine, the rerender will updated the html with updated value,
     but what happens if we update the non-reactive and then update the reactive value:
        1. you update 5 times the non-reactive -> html is not rerendered
        2. you updated 1 time the reactive value -> html is rerendered
     and now, here is the problem, the reactive value got from 0 -> 1, html shows 1,
     but html also will show 5 for non-reactive value, why ? because the state for
     non-reactive value is still maintained, it just doesnt trigger rerenders,
     so be aware about this. -->

<!-- tip: rerender is not tirggered if we update a reactive value to the same value -->
