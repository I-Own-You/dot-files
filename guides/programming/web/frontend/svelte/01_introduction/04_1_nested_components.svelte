<script lang="ts">
    // 1. this way you can import anothe svelte component and use inside current component
	// 2. although you can assign the name to the component as the filename, in our case it
	//    will not work since js/ts doesnt allow variable name that starts with a number
	// import 04_2_nested_components from "./04_2_nested_components.svelte";
	// 3. this way, it will work, name can be anything except it must align with language rules
	import NestedComponent from "./04_2_nested_components.svelte";
</script>

<p>This is a paragraph.</p>

<!-- 1. this is how you use the imported component -->
<!-- 2. this component also has a <p> tag,
        but our styles will not affect it since style are scoped to current component, not imported -->
<NestedComponent />

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>
