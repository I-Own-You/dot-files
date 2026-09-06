<script>
    import OtherComponent from './02_2_nested.svelte'
</script>

<!-- 1. here we pass some childrens into our component which we can render inside -->
<OtherComponent>
    <div>
        <p>Hello, whats your name ?</p>
        <p>My name is Astra! </p>
    </div>
</OtherComponent>

<!-- 2. we cannot use both snippets sent automatically as props at the same time since they will conflict, either send children nodes or snippets -->
