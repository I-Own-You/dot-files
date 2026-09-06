<script>
    let myDiv;
</script>

<!-- 1. you can use this argument for bind: directive to assign an element of a component
        to a binding
     2. myDiv will have a refernce of the p html tag which we assigned the variable to
     3. myDiv will be undefined untill the component mounts and renders the p tag,
        accessing myDiv earlier will result in accessing undefined,
        which means it will be populated only after component mounts -->
<p bind:this={myDiv}>
    Hello
</p>
