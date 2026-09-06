<script>
    import MyComponent from './11_2_nested.svelte';

    let color = $state('');
</script>

<p>{console.log($state.snapshot(color))}</p>

<!-- 1. this way, you can bind a property value on component -->
<MyComponent {color} />
<!-- 2. you can also skip the bindable argument if the name is the same as our reactive variable
            <MyComponent bind:color /> -->

<button onclick={() => color = 'red'}>
    Make P tag red from parent
</button>
