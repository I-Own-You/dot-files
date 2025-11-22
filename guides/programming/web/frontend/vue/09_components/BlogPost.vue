<script setup lang="ts">
import { computed, ref, watch } from "vue";

// by using defineProps we can declare component props
// props are:
// 1. compile time macro available only inside script with setup optin, does not need import
// 2. props are automatically exposed to template (where its used)
// 3. it also returns an object which contains all props in case you want myProp.propName1, myProp.propNameN
defineProps(["title"]);
// you can also annotate props with type in typescript:
defineProps<{ title?: string }>();
// you can also destructure, give default value, any ts thing...
const { title = "hello" } = defineProps<{ title?: string }>();

// if you want to watch some prop(for reactivity), you cant throw the destructured object like this:
// watch(title, () => {}) // it will throw error
// instead you need to use a getter and return the destructured object(actually its just a var here)
// watch(() => title, () => {}); // works
// if you want to pass destructured variable inside a function, you must use the above as well, a getter
// someFunc(() => title)

// by using defineEmits() we can declare events:
// 1. you dont have to specify events, but using so will give you autocomplete(if using ts) and
//    its a better way to document the code.
// 2. it also returns a function which can call all the events if $emit is not availabe somehow:
//    const emit = defineEmits(["enlarge-text"]); emit("enlarge-text")
defineEmits(["enlargeText", "exampleFunc"]);
// you cannot use $emit() inside script setup but defineEmits() actually returns a function that can be called
// note: its needed sometimes to call these inside functions
// note: you cannot call defineEmits in functions, only in script setup
const emit = defineEmits(["enlargeText", "exampleFunc"]);
emit("enlargeText"); // as simple as that
// you can also use runtiime validation if using typescript
const emitExampleTS1 = defineEmits({
    enlargeText: null, // no validation
    exampleFunc: ({ n }) => {
        if (typeof n == "number") return true;
        else return false;
    },
});
// or like this, more TS style with script setup
const emitExampleTS2 = defineEmits<{
    (e: "enlargeText"): void;
    (e: "exampleFunc", n: number): void;
    (e: "exampleFunc2", n: number): void;
}>();

// if you need initial value from a prop, you can create a variable, future updates are discarded
const initialValueFromProp = ref(title);
// if you need prop data to transform in future, you could create a computed variable instead,
// it will autoupdate when prop updates
const transformedTitle = computed(() => title.toUpperCase());

// note: you cant mutate parent props but you can mutate object nested values from that props, NEVER DO THAT
//       instead, emit an event and change what you need
</script>

<template>
    <div class="blog-post">
        <h4>{{ title }}</h4>
        <!-- components that emit events do not bubble. -->
        <button @click="$emit('enlargeText')">Enlarge text</button>
        <!-- when you need arguments, you can pass them after the emmitted event -->
        <button @click="$emit('exampleFunc', 2)">Enlarge text</button>
    </div>
</template>
