<script setup lang="ts">
import { useTemplateRef, onMounted, ref } from "vue";
import Child from "./Child.vue";

// the first argument must match the ref value in the template
const input = useTemplateRef("my-input");
const childRef = useTemplateRef("child"); // Child component instance
const list = ref([1, 2, 3, 4, 5]);
// itemRefs will contain all refs to all elements from v-for as <li> elements
const itemRefs = useTemplateRef("items");

onMounted(() => console.log(itemRefs.value));
onMounted(() => {
    input.value?.focus();
});
</script>

<template>
    <input ref="my-input" />
    <Child ref="child" />
    <ul>
        <li v-for="item in list" ref="items">
            {{ item }}
        </li>
    </ul>

    <!--
    if you use dynamic binding :ref, you can get the elements itself after each component update so,
    it means you can do whatever you want to it, after component is unmounted it becomes null
    -->
    <input
        :ref="
            (el) => {
                /* assign el to a property or ref */
            }
        "
    />
</template>
