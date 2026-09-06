<script>
	import Box from './03_2_nested.svelte';
</script>

<!-- 4.
        1. there is another way of modifiying child components CSS by passing a CSS property directly
           on child component from the parent component and then using it inside the child
        2. values can be reactive if you want
        3. under the hood each child component here is wrapped in an html element with
           "display: contents" so it looks like this:
                <svelte-css-wrapper style="display: contents; --color: red;">
	                {content goes here}
                </svelte-css-wrapper>
        3.1 this doenst break layout but can affect selectors like .parent > .child, so be aware  -->
<div class="boxes">
	<Box --color="red"/>
	<Box --color="green"/>
	<Box --color="blue"/>
</div>

<!-- 1. we can use :global CSS modifier to target child components to modify their CSS
     2. but this is very error prone and any modification to child component structure
        will literally break this :global
     3. keeping track of it is another nigtmare, only use it as last resort
<style>
	.boxes :global(.box:nth-child(1)) {
		background-color: red;
	}

	.boxes :global(.box:nth-child(2)) {
		background-color: green;
	}

	.boxes :global(.box:nth-child(3)) {
		background-color: blue;
	}
</style> -->
<!-- we commented this now because it affects the styles within the nested component since,
    :global has more priority then childs --color css property passed to it -->
