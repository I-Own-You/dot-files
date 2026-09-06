<div class="box"></div>

<style>
	.box {
		width: 5em;
		height: 5em;
		border-radius: 0.5em;
		margin: 0 0 1em 0;
	    /* here, we use the passed css property from the parent compoent "--color" */
		background-color: var(--color, #ddd);
	}
</style>
