<script>
    import OtherComponent from './01_2_nested.svelte'

	let emoji = '🙈';
	let description = 'see no evil';
</script>

<table>
	<thead>
		<tr>
			<th>emoji</th>
			<th>description</th>
			<th>unicode escape sequence</th>
			<th>html entity</th>
		</tr>
	</thead>

	<tbody>
	    <!-- 1. instead of this
		<tr>
			<td>{emoji}</td>
			<td>{description}</td>
			<td>\u{emoji.charCodeAt(0).toString(16)}\u{emoji.charCodeAt(1).toString(16)}</td>
			<td>&amp#{emoji.codePointAt(0)}</td>
		</tr> -->
		<!-- 2. we can use a #snippet block which help us reuse content within a component or its childs
		        without extracting it into a separate file
        -->
	    {#snippet monkey()}
           	<tr>
          		<td>{emoji}</td>
          		<td>{description}</td>
          		<td>\u{emoji.charCodeAt(0).toString(16)}\u{emoji.charCodeAt(1).toString(16)}</td>
          		<td>&amp#{emoji.codePointAt(0)}</td>
           	</tr>
        {/snippet}
        <!-- 3. by default, a snippet will not render until we tell it to render by using @render tag: -->
        {@render monkey()}
		<!-- 4 snippets can take parameters either defined or through destructur technique like so:

                {#snippet monkey(emoji, description)}...{/snippet}
               	{@render monkey('🙈', 'see no evil')}
                or
                {#snippet monkey({emoji, description)}...{/snippet}
               	{@render monkey({emoji = '🙈', description = 'see no evil'})}

                or just take an object and use obj.property_name inside snippet, or even make its values
                reactive, you got the idea

             4.1 the above code would help us removing emoji and description variables defined inside <script>
             5. snippets can be declared anywher within a component but are visible only to @render tags
                within component or its child components you pass snippet to and use in @render
             6. passing snippets to child components would be like any other props, like so:
                        <ChildComponent {monkey} /> if you want it to pass as "monkey" name prop
                        <ChildComponent anotherName={monkey} />
        -->
        <!-- 7. there is a special feature about snippters defined inside a parent component but passed
                directly to child tag:
                        1. it becomes props of the component automatically
             7.1 newSnippet will automatically pass into OtherComponent as a prop named newSnippet
             7.2 newSnippet is NOT PART of current component and not available to it -->
        <OtherComponent>
            {#snippet newSnippet()}
                <div>
                    <p>Hello, whats your name ?</p>
                    <p>My name is Astra! </p>
                </div>
            {/snippet}
        </OtherComponent>
	</tbody>
</table>

<style>
	th, td {
		padding: 0.5em;
	}

	td:nth-child(3),
	td:nth-child(4) {
		font-family: monospace;
	}
</style>
