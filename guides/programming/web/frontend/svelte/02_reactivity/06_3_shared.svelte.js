// 1. you cannot use svelte specific code inside .js/.ts files, you need .svelte in front of
//    the filename, in our case: 06_3_shared.svelte.js instead of 06_3_shared.js
export const counter = $state({
	count: 0
});
// 2. you cannot export $state declaration from a module if the declaration is reassigned
//    and not muated, because those who import would have no way to know this
// counter = 2; // error
// 2.1 mutation is allowed, this is usually never used or on rare occassion based on some
//     logic
counter.count = 5;
