<script>
	let m = $state({ x: 0, y: 0 });

    // notice the "event" parameter, its given to us by svelte(js) which contains a lot of useful
    // information about the html tag we assigned this function
	function onpointermove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<!-- 1. you can listen to any event on an html element using on<name> on it
     2. we could simplify by using the shorthand {onpointermove} since both property of div element and
        our function name coincide -->
<div onpointermove={onpointermove} role="presentation">
	The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>

<!-- 1. you can also declare event handlers inline, they also have "event" parameter passed -->
<div onpointermove={
        (event) => {
            m.x = event.clientX;
            m.y = event.clientY;
        }
    }
    role="presentation"
>
	The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>

<style>
	div {
		width: 100%;
		height: 100px;
	}
</style>
