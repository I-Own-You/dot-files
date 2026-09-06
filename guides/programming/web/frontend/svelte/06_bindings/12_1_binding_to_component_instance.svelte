<script>
    import SomeComponent from './12_2_nested.svelte';

    let myComponent;
</script>

<!-- you can bind to a component using "this" as well, and then use use its logic -->
<SomeComponent bind:this={myComponent} />

<button onclick={myComponent.genNumber}>
    Generate a new number!
</button>
