import { writable } from 'svelte/store';

// writable function allows us to make a variable reactive to be used within different components
// even though its defined outside a component
export const count = writable(0);
