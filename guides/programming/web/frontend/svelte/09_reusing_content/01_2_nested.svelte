<script>
    // 1. but there is problem, even though you pass a snippet automatically, its not
    //    available until you take it from props, there are 2 ways to do so:
    //         1. let { newSnippet } = $props();
    //         2. let props = $props(); // props.newSnippet()
    // 2. take the newSnippet prop which we automatically passed to this component
    let { newSnippet } = $props();
</script>

{@render newSnippet()}
