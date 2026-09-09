<script>
    // 1. by setting a binded property from parent to a default value of $bindable you can now
    //    change color reactive value from both parent and child
    // 2. this helps with the fact that we now can change state for the parent as well which
    //    passing a simple state with $state as prop and changing it wont trigger a rerender for parent,
    //    it will not even trigger a rerender for child...
    // 2.1 usually this is done by passing a function which changes state within the parent
    //     as a prop to child where child can assign it as an event handler
    let { color = $bindable('') } = $props();
</script>

<p style="color: {color}"> hello, its me! </p>

<!-- just color = 'green' is enough! -->
<button onclick={() => color = 'green'}>
    Make P tag green from child
</button>

<!-- dont rely on component bindings too hard because most of the time its just
     too hard to maintain and especially hard to keep track of -->
