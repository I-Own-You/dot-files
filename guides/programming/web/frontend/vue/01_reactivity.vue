<script setup lang="ts">
import { ref } from "vue";
import { nextTick } from "vue";
import { reactive } from "vue";

// reactive variable, made possible with reactive() function
// 1. reactivity works on any nested level, it tracks everything
// 2. you can opt out of it with shallowRef(), which will track only .value(so only first level)
// 3. only first level ref() is unwrapped inside templates, const count = { id : ref(0)} is NOT.
const count = ref(0); // { value : 0 }
const unwrappedCount = { unwrappedId: ref(0) }; // this needs unwrappedCount.unwrappedId.value
// destructuring it will help, and now only unwrappedId without .value
const { unwrappedId } = unwrappedCount;

// function mutating reactive variable
function increment() {
    count.value++;
}

async function sync_incrememnt() {
    // dom updates are not made right after state changes, it buffers until its the right moment, so if you,
    // had a lot of state changes to not render a lot of times they will be batched, but you can opt out,
    // of it with nextTick() function which will udpate dom right after state udpates
    await nextTick();
    // Now the DOM is updated
}

// you can also have a reactive object made with reactive(),
// now the state itself is reactive and all its nested levels
//
// reactive returns a proxy of the object, not the original one, reactive of proxy also returns proxy,
// of the original object, all objects nested inside are also proxies.
// you must always work on proxies, not original objects, only proxies are tracked.
//
// reactive() caveats:
// 1. works only on object, not primitive types
// 2. once you create another reactive and assign to other reactive, the other reactive loses first connection
// 3. destructuring the reactive object loses the reactivity, so you need to pass entire object
// 4. if you make a ref(reactive value) a property inside reactive({}) and access/mutate it thorugh reactive
//    variable, the ref variable will be accessed/mutated as well, it works if its not shallow for both.
// 4.1 if reactive replaces its old ref variable, old ref variables looses connection with reactive
// 5. arrays/collections as refs inside reactive array and accessed as elements like [0] needs [0].value
const state = reactive({ count: 0 }); // { count: 0 }
// there is also shallowReactive() to make only the first level .count be tracked instead of all levels
</script>

<template>
    <!--
       this doesnt trigger infinite render because count is updated on click event,
       then html just updates and thats it
    -->
    <button @click="count++">
        {{ count }}
    </button>
    <button @click="state.count++">
        {{ count }}
    </button>
    <button @click="increment">
        {{
            count // we dont need count.value, its unwrapped automatically in template
        }}
    </button>
</template>
