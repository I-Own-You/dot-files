<script>
	let scoops = $state(1);
	let flavours = $state([]);

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
	<label>
		<input
			type="radio"
			name="scoops"
			value={number}
			bind:group={scoops}
		/>

		{number} {number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}

<h2>Flavours</h2>

<!-- 1. to bind multiple value on a select, we need "multiple" attribute on select tag
     2. bind:value={reactive value of array type}, because now, since we can choose more than
        1 value on a select, we need an array which will store our options, it will update
        on our select/deselect -->
<select multiple bind:value={flavours}>
	{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
	    <!-- we dont need "value" attribute on option tag since by default "value" attribute
			 will be populated with the text provided inside <option></option> -->
		<option>{flavour}</option>
	{/each}
</select>
<p>{console.log(flavours)}</p>

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}
