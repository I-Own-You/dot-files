<script>
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<!-- 1. strings in svelte are inserted as plain text, < > tags have no meaning,
        but if our string has html inside it ? -->
<p>{string}</p>

<!-- 2. for rendering data as html in svelte, you use @html tag insie { } -->
<p>{@html string}</p>

<!-- @html DO NOT SANITIZE the content you pass it, which means its up to you
     to sanitize the data you pass into @html, if you trust the data, you can skip
     sanitization, but if its something you dont trust, you should sanitize it first
     and only then pass it to @html -->
