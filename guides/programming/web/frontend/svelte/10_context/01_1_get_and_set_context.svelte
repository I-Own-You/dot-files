<script>
    import MyComponent from './01_2_nested.svelte';

    import { setContext } from 'svelte';

    let myObj = {age: 5};

    // 1. the way setContext works is this:
    //      1. frist argument it wants a unique key of anything, either string, Symbol, Map, .etc
    //      2. second argument is the value set to that key, can be anything you want(mostly)
    // 2. rewriting the same key means the old value is destroyed and new value set
    // 3. the point of context is that you can use it everywhere in your project without passing
    //    props data/functions creting really clunky dependencies;
    // 4. you can even pass a reactive value or whatever you want and
    //    childs will react to it (really poewrful)
    // 5. both setContext and getContext must be called during component initialization not mounting,
    //    so just inside root scope of <script> tag

    setContext('my-key1', { destructuredElement: 'a' });
    setContext('my-key2', 'letter a');
    setContext('my-key3', 2);
    setContext('my-key4', myObj);
    // you cannot pass functions directly like  setContext('my-key5', effectFromParent);
    setContext('my-key5', { effectFromParent });

    function effectFromParent() {
        $effect(() => {
            console.log("hello from parent!");
        })
    }
</script>

<MyComponent />
