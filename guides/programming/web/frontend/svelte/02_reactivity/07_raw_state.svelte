<script>
    // 1. what if you dont want to react on a state which changees occur insie (deeply) ?
    //    for this scenario, you can use $state.raw() which will react only if you change the
    //    state variable directly, rather than inside.
	let not_deep_reactive = $state.raw([]);

</script>

<div>
    <p> {not_deep_reactive.length == 0 ? '[]' : not_deep_reactive.join(" + ")} </p>
</div>

<button onclick={
        // 1. this way, changes to our reactive value will not cause a rerender since we
        //    made it non-deep reactive
        () => not_deep_reactive.push(Math.trunc(Math.random() * 10))
    }
>
    Update non deep reactive value
</button>

<button onclick={
        // 2. but this, will cause a rerender since we change the reactive variable itself
        () => not_deep_reactive = [...not_deep_reactive, Math.trunc(Math.random() * 10)]
        //
        // 3. we have a side effect as well, but its not the point of this file,
        //    the side effect is that if you trigger the button which changes the inner value
        //    a rerender is not caused but the not_deep_reactive array is still updated with new
        //    values and when you click this button, it will take the updated array
    }
>
    Update non deep reactive value
</button>
