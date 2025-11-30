<script setup lang="ts">
import { onActivated, onDeactivated } from "vue";
import ButtonCounter from "./09_components/09_fallthrough_attributes/ButtonCounter.vue";
import FancyButton from "./09_components/09_slots/FancyButton.vue";

const whichComponentNow = ["ButtonCounter", "FancyButton"][
    Math.floor(Math.random() * 10) % 2
];

// when a component is part of KeepAlive cached componentes tree (somehwere down below), it actually goes into an
// activated/deactivated state based on mount/unmount, so it doesnt get destroyed, it just goes from/into cache.
//
// this means there are 2 lifecycle hooks that can catch it and you can do something after it:
onActivated(() => {});
onDeactivated(() => {});
</script>
<template>
    <!-- KeepAlive builtin component let us cache components, in this case when using <component> tag,
         we can switch between components and their state wont be reset -->
    <KeepAlive>
        <component :is="ButtonCounter" />
    </KeepAlive>

    <!-- by default, KeepAlive caches everything inside, but you can choose what to cache instead of inside,
         with "include" attribute to choose which component/s will be cached -->
    <!-- string: based on components file name -->
    <KeepAlive include="ButtonCounter,FancyButton">
        <component :is="whichComponentNow" />
    </KeepAlive>
    <!-- regexp: based on components file name -->
    <KeepAlive :include="/ButtonCounter|FancyButton/">
        <component :is="whichComponentNow" />
    </KeepAlive>
    <!-- string array: based on components file name -->
    <KeepAlive :include="['ButtonCounter', 'FancyButton']">
        <component :is="whichComponentNow" />
    </KeepAlive>

    <!-- we can limit the amoutn of possible cached componentts with "max" attribute, we can give it a string number,
     or a dynamic number -->
    <!-- here, it has no point since we only use 2 components, but if we would have more than 5, after the 5,
         it would drop the compnent based on LRU system -->
    <KeepAlive :include="['ButtonCounter', 'FancyButton']" max="5">
        <component :is="whichComponentNow" />
    </KeepAlive>
</template>
