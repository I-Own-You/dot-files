<script setup lang="ts">
import { ref, VueElement } from "vue";

const count = ref(0);

const name = ref("Vue.js");
// event handler object is the native event from button given by vue
function greet(event) {
    alert(`Hello ${name.value}!`);
    // `event` is the native DOM event
    if (event) {
        alert(event.target.tagName);
    }
}

function say(message) {
  alert(message)
}
function warn(message, event) {
  // now we have access to the native event
  if (event) {
    event.preventDefault()
  }
  alert(message)
}

function doSomething() {}
</script>

<template>
    <!-- simple event handling with js code in click event -->
    <button @click="count++">Add 1</button>
    <p>Count is: {{ count }}</p>
    <!-- handling event with greet defined function -->
    <button @click="greet">Greet</button>
    <!-- there is no difference if you put () or not, it will fire only on click -->
    <button @click="say('hello')">Say hello</button
    <!-- using $event special variable in inline calling -->
    <button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>
    <!-- using inline arrow function to get event -->
    <button @click="(event) => warn('Form cannot be submitted yet.', event)">Submit</button>

    <!--
    event modifiers:
    some examples, there are many more
    -->
    <a @click.stop="doSomething"></a>
    <form @submit.prevent="doSomething"></form>
    <a @click.stop.prevent="doSomething"></a>
    <form @submit.prevent></form>
    <div @click.self="doSomething">...</div>
    <div @click.capture="doSomething">...</div>
    <a @click.once="doSomething"></a>
    <div @scroll.passive="doSomething">...</div>
    <input @keyup.enter="doSomething" />
    <input @keyup.page-down="doSomething" />
    <input @keyup.alt.enter="doSomething" />
    <div @click.ctrl="doSomething">Do something</div>
    <button @click.ctrl="doSomething">A</button>
    <button @click.ctrl.exact="doSomething">A</button>
    <button @click.exact="doSomething">A</button>
</template>
