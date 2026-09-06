<script>
    // 1. there is also one more important thing to know about props, there is a prop called "children"
    //    which stores everything we pass into component not as a property, but as child nodes
    // 1.2. its not passed as a property like this:
    //              <Component children="something" />
    // 1.3 but inside the component as new node like this:
    //              <Component><div>.etc</div></Component>
    // 2.2 you can have any nesting, html tags, .etc
    // 3. there are 2 ways to access children prop:
    //    1. let { children } = $props();
    //    2. let props = $props(); // props.children
    let { children } = $props();
</script>

{@render children()}
