<script setup>
// you can use defineModel() to make a 2 way binidng between parent/child,
// when model is updated in either child/parent, then parent/child is also updated.
// note: defineModel() returns a ref
const model = defineModel();

// you can make the v-model required, so you must put it inside v-model
//     const model = defineModel({ required: true })
// you can provide a default value, but becautious,
// if parent doesnt provide a defaullt value but your child does, it can cause desynchronization between parent/child
//     const model = defineModel({ default: 0 })

// if you have to pass arguments,
// (like your parent provides some data but you choose to use another with v-model:title="anotherRef" ),
// you can pass it as first argument inside defineModel():
//     const model = defineModel('title'),
// you can pass options too:
//     const model = defineModel('title', {required: true, default: 0}),

function update() {
    model.value++;
}
</script>

<template>
    <div>Parent bound v-model is: {{ model }}</div>
    <button @click="update">Increment</button>
    <!-- since model is a ref, you can also use it inside v-model  -->
    <input v-model="model" />
</template>
