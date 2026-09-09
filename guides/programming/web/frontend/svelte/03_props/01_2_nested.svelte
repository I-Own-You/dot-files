<script>
    // 1. you can receive props from your parent using $props() rune, here we use the destructure
    //    technique to take an object field, in our case "answer"
	let { answer } = $props();
	// 2. alternatively we could take the whole object $props() gave us and use it later
	// let props = $props();
	//
	// 3. you cannot have more than 1 call to $props() in a component;

</script>

<p>The answer is {answer}</p>
<!-- <p>The answer is {props.answer}</p> -->
