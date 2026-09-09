<script>
	let name = $state('world');
</script>

<!-- 1. in svelte usually 100% of the time a parent sets the child props
     but what if we wanted reverse or both to be able ? -->

<!-- 2. by using bind: directive, which means this:
        1. updating name updates input value
        2. updating input value updates name -->
<input bind:value={name} />

<h1>Hello {name}!</h1>

<!-- bind: directive supports a lot of things, consult the docs to see more info, its very useful like:
           audio, video, dimension(through ResizeObserver), .etc  -->
