<script setup lang="ts">
import { ref } from "vue";

const text = ref("");
const checked = ref(true);
const checkedNames = ref([]);
const picked = ref("");
const selected = ref("");
const selectedArray = ref([]);
const special = ref("");
const randomWord1 = ref("");
const randomWord2 = ref("");
const age = ref(2);

const options = ref([
    { text: "One", value: "A" },
    { text: "Two", value: "B" },
    { text: "Three", value: "C" },
]);
</script>

<template>
    <input
        :value="text"
        @input="(event) => (text = (event.target as HTMLInputElement).value)"
    />
    <!-- this is a shorthand from vue, initial value is text variable, not input default
         note: v-model doesnt work with IME(chinese, korean, .etc) characters -->
    <input v-model="text" />

    <!-- textarea -->
    <span>Multiline message is:</span>
    <p style="white-space: pre-line">{{ text }}</p>
    <textarea v-model="text" placeholder="add multiple lines"></textarea>
    <!-- <textarea>{{ text }}</textarea> // doesnt work
    <textarea v-model="text"></textarea> // does work -->

    <!-- checkbox -->
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>
    <!-- checkbox as values in array -->
    <div>Checked names: {{ checkedNames }}</div>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>

    <!-- radio -->
    <div>Picked: {{ picked }}</div>
    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>
    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>

    <!-- select -->
    <!-- note:
    if selected value does not match any from select option, select will be in unselected state -->
    <div>Selected: {{ selected }}</div>
    <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
    </select>
    <!-- multiple select in an array -->
    <div>Selected: {{ selectedArray }}</div>
    <select v-model="selectedArray" multiple>
        <option>A</option>
        <option>B</option>
        <option>C</option>
    </select>
    <!-- dynamically created options of select -->
    <div>Selected: {{ selected }}</div>
    <select v-model="selected">
        <option v-for="option in options" :value="option.value">
            {{ option.text }}
        </option>
    </select>

    <!--
    vue provides special true-value and false-value without affectin value of input, which means
    special variable here will be either "yes" if checkbox is checked or "no" if not
    -->
    <input
        type="checkbox"
        v-model="special"
        true-value="yes"
        false-value="no"
    />
    <!-- they can both be reactive -->
    <input
        type="checkbox"
        v-model="special"
        :true-value="randomWord1"
        :false-value="randomWord2"
    />
    <!-- any other input like radio, input, select, .etc will assign value attribute -->
    <input type="radio" v-model="picked" :value="special" />
    <!-- even objects can be assigned, literally any js data -->
    <select v-model="selected">
        <option :value="{ number: 123 }">123</option>
    </select>

    <!-- input fields have modifiers -->
    <input v-model.lazy="text" />
    <input v-model.number="age" />
    <input v-model.trim="text" />
</template>
