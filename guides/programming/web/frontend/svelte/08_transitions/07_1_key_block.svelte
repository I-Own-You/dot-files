<script>
	import { typewriter } from './07_3_transition.js';
	import { messages } from './07_2_loading_message.js';

	let i = $state(-1);

	$effect(() => {
		const interval = setInterval(() => {
			i += 1;
			i %= messages.length;
		}, 2500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<h1>loading...</h1>

<!-- 1. #key blocks destroy and recreate their contents when the value of an expression change,
        in our case "i" which is itself a reactaive value
     2. its useful for different scenarios but especially when you want to play an element
        transition everytime something changes and not only when it enter/leave DOM -->
{#key i}
    <!-- typewriter here is a custom transition -->
    <p in:typewriter={{ speed: 10 }}>
    	{messages[i] || ''}
    </p>
{/key}
