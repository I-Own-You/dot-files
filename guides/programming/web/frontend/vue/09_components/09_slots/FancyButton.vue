<script setup lang="ts">
import { ref } from "vue";

const slotText = ref("a");
const nr = ref(2);
const items = ref([
    { body: "something1", username: "a", likes: 5 },
    { body: "something2", username: "b", likes: 6 },
    { body: "something3", username: "c", likes: 7 },
]);
</script>

<template>
    <button class="fancy-btn">
        <!-- text inside <FancyButton></FancyButton> will be replaced instead of <slot />
        note: you can put anything inside <slot> and it will be as fallback -->
        <slot> fallback content in case parent doesnt provide any data </slot>
    </button>

    <!-- we can also specify where the slot content will go with
     v-slot:slotName or #slotName inside parent and name="slotName" inside component -->
    <div class="container">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <!-- slot without name has implicitly "default" name, but you also could specify it -->
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>

    <!-- we can also render something if a slot is provided -->
    <template>
        <div class="card">
            <!-- div will render only if header slot is provided -->
            <div v-if="$slots.header" class="card-header">
                <slot name="header" />
            </div>
            <!-- div will render only if default slot is provided -->
            <div v-if="$slots.default" class="card-content">
                <slot />
            </div>
            <!-- div will render only if footer slot is provided -->
            <div v-if="$slots.footer" class="card-footer">
                <slot name="footer" />
            </div>
        </div>
    </template>

    <!-- you could pass data to parent like this using a default slot -->
    <slot :text="slotText" :myNumber="nr"></slot>
    <!-- passing data to a named slot -->
    <template>
        <div>
            <slot text="a" name="headerProps"></slot>
        </div>
        <div>
            <slot :numberK="2" name="defaultProps"></slot>
        </div>
        <div>
            <slot :isB="false" name="footerProps"></slot>
        </div>
    </template>

    <!-- why though ? why would i need to pass data form child to parents taht is updated on both side ? -->
    <!-- you encapsulate the data and logic in child, but styles goes to parent. -->
    <ul>
        <li v-for="item in items">
            <slot name="item" v-bind="item"></slot>
        </li>
    </ul>
</template>
