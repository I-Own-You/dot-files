<script setup lang="ts">
import { reactive, computed, ref } from "vue";

const author = reactive({
    name: "John Doe",
    books: [
        "Vue 2 - Advanced Guide",
        "Vue 3 - Basic Guide",
        "Vue 4 - The Mystery",
    ],
});

// computed ref
// 1. computed() wants a getter
// 2. returns an unwrapped ref(), so its a ref
// 3. depends on reactive values, in our case author object
// 4. autoupdates when reactive values changes
// 5. they are cached and instantly given if unchanged
// 6. assigningn to it results in warning but can be achieved by providing a setter beside getter
const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? "Yes" : "No";
});

// provide a setter so we can set another value for computed property without warning
const firstName = ref("John");
const lastName = ref("Doe");
const fullName = computed({
    get() {
        return firstName.value + " " + lastName.value;
    },
    // setter
    set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        [firstName.value, lastName.value] = newValue.split(" ");
    },
});

// you can have the previous value as first argument of getter
const count = ref(2);
const alwaysSmall = computed((previous) => {
    if (count.value <= 3) {
        return count.value;
    }

    return previous;
});
// same but with setter functionality
const alwaysSmallSetter = computed({
    get(previous) {
        if (count.value <= 3) {
            return count.value;
        }

        return previous;
    },
    set(newValue) {
        count.value = (newValue as number) * 2;
    },
});

// computed props must be:
// 1. side effects free (no state changing, async fetch, dom maniuplation, .etc)
// 2. avoid mutatin computed prop, its just a snapshot and it changes when its updated
</script>

<template>
    <p>Has published books:</p>
    <span>{{ publishedBooksMessage }}</span>
</template>
