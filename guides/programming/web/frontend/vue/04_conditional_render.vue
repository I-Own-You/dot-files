<script setup lang="ts">
import { reactive, ref } from "vue";

const awesome = ref(0);
const items = ref([{ message: "Foo" }, { message: "Bar" }]);
const myObject = reactive({
    title: "How to do lists in Vue",
    author: "Jane Doe",
    publishedAt: "2016-04-10",
});
</script>

<template>
    <!-- render a block with v-if, v-else-if, v-else -->
    <button @click="awesome = awesome++">Toggle</button>
    <h1 v-if="awesome == 0">Vue is awesome!</h1>
    <h1 v-else-if="awesome == 1">Oh no 😢</h1>
    <h1 v-else>Oh no 😢</h1>
    <!-- note: v-if and v-for on same element is not advices, v-if takes precedence. -->

    <!--
    v-if in template tag acts as a wrapper since v-if needs only 1 element, so the render will be,
    the inside of template without template itself
    -->
    <template v-if="Math.random() * 10 > 5">
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </template>
    <!--
    v-show is another option beside v-if, the main difference is:
    the component with v-show is always rendered and present in DOM, so v-show just toggle the,
    display CSS property, you cant use v-show on template tag and it doesnt work with v-else
    note: v-if is more costly when you toggle something, v-show only on initial render costs more.
    -->
    <h1 v-show="Math.random() * 10 > 5">Hello!</h1>

    <!-- we can v-for to render a list of someting from a collection -->
    <li v-for="item in items">
        {{ item.message }}
    </li>
    <!-- v-for has a second argument, the index -->
    <li v-for="(item, index) in items">
        {{ (item.message, index) }}
    </li>
    <!-- you can use nested v-for -->
    <li v-for="item in items">
        <span v-for="childItem in item">
            {{ item.message }} {{ childItem }}
        </span>
    </li>
    <!-- you can also use for-of style of js -->
    <div v-for="item of items">{{ item }}</div>
    <!-- very easy to go thorugh object properties -->
    <ul>
        <li v-for="value in myObject">
            {{ value }}
        </li>
    </ul>
    <!-- another form where you have the value/key pair of the object -->
    <li v-for="(value, key) in myObject">{{ key }}: {{ value }}</li>
    <!-- another form where you have the value/key pair of the object + index -->
    <li v-for="(value, key, index) in myObject">
        {{ index }}. {{ key }}: {{ value }}
    </li>
    <!-- there is a for-range option as well -->
    <span v-for="n in 10">{{ n }}</span>
    <!-- you can use v-for to output a lot of blocks, without template tag itself -->
    <ul>
        <template v-for="item in items">
            <li>{{ item.message }}</li>
            <li class="divider" role="presentation"></li>
        </template>
    </ul>
    <!--
    there is a concept about dom nodes that can reorder/change/miss,
    and if anything happens, you must manipulate DOM which costs on resources, so vue to be efficient,
    you must assign key attribute with unique data so vue can track it and reuse when needed.
    key attribute is needed only for v-for elements and template tags
    note: key attribute is mainly needed for v-for elements or when no component/stateful dom elements,
          exist or you want the default behaviour
    -->
    <div v-for="item in items" :key="item.message"></div>
    <!-- key attribute goes into template tag -->
    <template v-for="item in items" :key="item.message">
        <li>{{ item.message }}</li>
    </template>
    <!-- you can easily use components with v-for but it wont pass any data to it -->
    <MyComponent v-for="item in items" :key="item.message" />
    <!-- to pass data to a component you need to assign prop on it -->
    <MyComponent
        v-for="(item, index) in items"
        :item="item"
        :index="index"
        :key="item.message"
    />
</template>
