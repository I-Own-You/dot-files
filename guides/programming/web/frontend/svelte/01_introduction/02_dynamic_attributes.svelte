<script>
	let src = "/some/path";
	let full_attr_name = "some description"
	let partial_attr_name = "some"
	let alt = "some description"
</script>

<!-- since you can use ts code inside {}, you can control attributes data -->
<img src={src} alt={full_attr_name} />

<!-- you can even use ts code inside { } which are themselves inside "" -->
<img src={src} alt="{partial_attr_name} description" />

<!-- svelte gives you the ability to shorthand a name -->
<img {src} {alt} />
