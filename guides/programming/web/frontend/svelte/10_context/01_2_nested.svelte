<script>
    import { getContext } from 'svelte';

    // 1. getContext() is used to retrieve value using a key setContext assigned
    const { destructuredElement } = getContext('my-key1');
    const letter_a = getContext('my-key2');
    const number_2 = getContext('my-key3');
    const myObj = getContext('my-key4');

    getContext('my-key5').effectFromParent();

    // 1. both setContext and getContext must be called during component initialization not mounting,
    //    so just inside root scope of <script> tag

</script>

<p>{destructuredElement}</p>
<p>{letter_a}</p>
<p>{number_2}</p>
<p>{myObj.age}</p>
