<script setup>
import { provide, readonly } from "vue";

// this way, you can provide data at any level deep in nested components
// note:
//       1. provide accepts 2 arguments: key,value.
//       2. key can be string/Symbol type
//       3. you can call provide() how many times you want with different key, all will register
//       4. proividng the same key will rewrite data so the nearest component will take precedence
//       5. by providing a reactive data, any component injecting it will establish a reactive connection(updates)
//
provide("message", "hello!");

// note:
//      1. in terms of reactive values, mutations be better done in provide component,
//      2. but if you need to update inside where you inject, create a function that updates it and provide both,
//         reactive value + function that updates it to component which injects it.
const reactiveNumber = ref(0);
provide("reactiveVar", reactiveNumber);
// note: you can make data you pass readonly so anyone injecting cant modify it, mostly useful for reactive values.
provide("readOnlyReactiveVar", readonly(reactiveNumber));

// note: if you have a lot of provide, you can create a file keys.ts which will hold all symbols that you can use,
//       and stop thinking about names, since all symbols are unique by default in js.

// you can also provide globally at app level when creating it, its useful for plugins, when you create them
//       import { createApp } from 'vue'
//       const app = createApp({})
//       app.provide('message', 'hello!')
</script>
