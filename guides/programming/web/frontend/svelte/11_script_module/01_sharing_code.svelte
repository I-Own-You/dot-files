<script module>
    // 1. you can have more than 1 script tag, the second script tag can have a
    //    "module" attribute which means code inside this script tag will run only once,
    //    when the module first evaluates and not when component instantiates
    // 2. what this means ? if you use current component multiple time somewhere, its easy
    //    to reuse data defined here because it will be the same for every component used.
    //
    // example:
    //          1. in your parent component you use this component 5 times
    //          2. every component rendered will have access to code defined here at the same time
    //             without even needing reactive state for this
    // 3. dont abuse this, you will rarely if really need this usability
    let name = 'Ana';

    // 4. another feature is that you can export things from script tag which works from
    //    default script as well, and then import it inside another component, usually parent
    //    and assign it to an event handler
    export function greetings() {
        alert(name);
    }
    // 4.1 we saw this feataure when were talking about bindings to a component itself with "this"

    // you cannot have a default export since the component itself is the default export

</script>

<script>
    // we still have the ability to define the default script tag with our logic
</script>

<!-- every component will have a p tag with "Ana" inside it -->
<p>{name}</p>
