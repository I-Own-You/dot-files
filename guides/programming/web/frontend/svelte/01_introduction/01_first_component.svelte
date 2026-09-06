<!-- 1. elements with html tags are displayed on the web page -->
<!-- 2. you can use ts code inside { } -->
<h1>Welcome, {name}!</h1>
<h1>Welcome, {name.toUpperCase()}!</h1>

<!-- this is the script (logic) of the current component which can be used in html tags -->
<script lang="ts">
    let name = 'Svelte';
</script>
