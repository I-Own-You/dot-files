<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const isActive = ref(true);
const classObject = reactive({
    active: true,
    "text-danger": false,
});

const hasError = ref(null);
const computedClassObject = computed(() => ({
    active: isActive.value && !hasError.value,
    "text-danger": hasError.value && hasError.value === "fatal",
}));

const activeClass = ref("active");
const errorClass = ref("text-danger");
const activeColor = ref("red");
const fontSize = ref(30);
const styleObject = reactive({
    color: "red",
    fontSize: "30px",
});
</script>

<template>
    <!-- we can assign an object to define our classes -->
    <div :class="{ active: isActive }"></div>
    <!--
    1. static classes can exist with dynamic one
    2. below div will have class="static active"
    -->
    <div
        class="static"
        :class="{ active: isActive, 'text-danger': hasError }"
    ></div>
    <!-- you can also pass an object, its identical to above syntax -->
    <div :class="classObject"></div>
    <!-- now its cached until any dependency changes for our computed object -->
    <div :class="computedClassObject"></div>
    <!-- we can assign string values as refs inside an array -->
    <div :class="[activeClass, errorClass]"></div>
    <!-- you can also conditionally choose which class to render -->
    <div :class="[isActive ? activeClass : '', errorClass]"></div>
    <div :class="[{ [activeClass]: isActive }, errorClass]"></div>

    <!--
        if we have a component named MyComponent with <p class="foo bar">Hi!</p>, then
        any class we give will merge into the root element of the component, so now our p tag with foo bar,
        becomes: foo bar baz boo, it works for dynamic classes bindings as well.
    -->
    <MyComponent class="baz boo" />
    <!--
        if our MyComponent has this, it means more than 1 root element, now vue doesnt know which to give,
        the classes we defined above, so it means we need to specifiy class="$attr.class" in either root,
        element so it could merge.
        <p :class="$attrs.class">Hi!</p>
        <span>This is a child component</span>
        and now it becomes:
        <p :class="baz boo">Hi!</p>
        <span>This is a child component</span>
    -->

    <!-- style tag also supports object styling -->
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    <!-- kebab case is also supported -->
    <div :style="{ 'font-size': fontSize + 'px' }"></div>
    <!-- its often recommened to style as a whole object -->
    <div :style="styleObject"></div>
    <!-- you can merge static and dynamic -->
    <h1 style="color: red" :style="'font-size: 1em'">hello</h1>
    <!-- you can also merge and override using objects inside array -->
    <div :style="[styleObject, { color: 'red', fontSize: '2px' }]"></div>
</template>
