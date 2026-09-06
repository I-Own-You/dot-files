<script>
	let is_checked = $state(false);
</script>

<label>
    <!-- when working with checboxes, you bind to "checked" and not value as with input
	<input type="checkbox" bind:checked={is_checked} />
	Yes! Send me regular email spam
</label>

{#if is_checked}
	<p>
		Thank you. We will bombard your inbox and sell
		your personal details.
	</p>
{:else}
	<p>
		You must opt in to continue. If you're not
		paying, you're the product.
	</p>
{/if}

<button disabled={!is_checked}>Subscribe</button>
