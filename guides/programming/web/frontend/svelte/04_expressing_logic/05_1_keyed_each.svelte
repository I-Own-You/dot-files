<script>
	import Thing from './05_2_nested.svelte';

	let things = $state([
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	]);
</script>

<!-- 1. by default updating the value of an #each block will add/remove DOM nodes at the end
        of the block if size of the block changes (block is all nodes together) and then
        DOM is updated, its 99.9% of the time not what you want
     2. In svelte, component runs once and then subsequent updates are more precise
        which makes things faster and gives more contrl
     3. in our case, shifting the array will remove the last node even though
        we remove the frist one which results in emoji variable name from Thing component
        being inconsistent since they are not reactive and dont update since svelte runs
        this component only once and then only add/remove.
     4. there are 2 ways to fix this:
            1. you can make "emoji" variable from Thing component either reactive or derived
               but this is clunky, since last node is anyway removed, we just synchronize
               the reactive value to match the "name" props
            2. the best way is to add a unique key to our nodes which will make svelte
               remove the first node instead of the last one without touching "emoji"
               from Thing component -->
<button onclick={() => things.shift()}>
	Remove first thing
</button>

<!-- 1. to assign a unique key to node, you put it either:
            1. near the value like so: {#each things as thing (thing.id) }
               where "thing" is the object from the things array and ".id" is the property
               from the thing object
            2. or you could use thing itself and add surrounding ( ), this works
               because svelte internally uses Map and objects as keys works for Map, but
               generally speaking string/number is safer as a key -->
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}
