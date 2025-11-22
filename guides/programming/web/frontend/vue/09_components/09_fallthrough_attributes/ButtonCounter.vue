<script setup lang="ts">
import { ref, useAttrs } from "vue";

const count = ref(0);

// if you dont want a component to inherit fallthrough attributes, you can specify so
defineOptions({ inheritAttrs: false });

// you can also access fallthrough attributes in script setup
const attrs = useAttrs();

// note:
//      1. fallthrough attributes are not reactive
//      2. you cannot use them as watchers ref
// so if you need reactivity, use a prop, or onUpdated() to get the latest attributes data
</script>

<template>
    <!-- here, button will have another click event that fallthrough from the parent, both will fire -->
    <button @click="count++">You clicked me {{ count }} times.</button>
    <!-- note: if you would had here another component which would be the root tag, fallthrough attributes would go,
               into it as well, but component can accept them as props though. -->
    <!-- if you disabled inherting attributes, you can control them now manually,
         $attrs is an object containing all kind of fallthrough data: class, style, v-on, ids, .etc -->
    <button type="button">{{ $attrs }}</button>
    <div>
        <!-- now, you can bind all fallthrough attributes to our button wrapped with a div -->
        <button type="button" v-bind="$attrs"></button>
    </div>

    <!-- but now there is a problem since we added another tag beside button, now fallthrough attributes do not know
         where to go, now we explicitly need to attach them with $attrs, the above will work since we disabled inheriting,
         but if we would not, we would need to specify $attrs where we needed it to be. -->
</template>
