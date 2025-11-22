<script setup lang="ts">
// there is a way to trigger a callback when something reactive changes so, a side effect using watch
import {
    onWatcherCleanup,
    reactive,
    ref,
    watch,
    watchEffect,
    watchPostEffect,
    watchSyncEffect,
} from "vue";

const question = ref("");
const answer = ref("Questions usually contain a question mark. ;-)");
const loading = ref(false);
const data = ref("");
const id = ref(0);

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.includes("?")) {
        loading.value = true;
        answer.value = "Thinking...";
        try {
            const res = await fetch("https://yesno.wtf/api");
            answer.value = (await res.json()).answer;
        } catch (error) {
            answer.value = "Error! Could not reach the API. " + error;
        } finally {
            loading.value = false;
        }
    }
});

// you can have different source for watcher
const x = ref(0);
const y = ref(0);
// single ref
watch(x, (newX) => {
    console.log(`x is ${newX}`);
});
// getter
watch(
    () => x.value + y.value,
    (sum) => {
        console.log(`sum of x + y is: ${sum}`);
    },
);
// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
    console.log(`x is ${newX} and y is ${newY}`);
});

// reactive objects have full depth watch if watch is used on whole object
const obj = reactive({ count: 0 });
watch(obj, (newValue, oldValue) => {
    // fires on nested property mutations
    // Note: `newValue` will be equal to `oldValue` here
    // because they both point to the same object!
});
watch(
    () => obj,
    () => {
        // fires only when obj is replaced
    },
);
watch(
    () => obj,
    (newValue, oldValue) => {
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* obj has been replaced
    },
    { deep: true }, // because of this now its deep watch
    // you can have instead of true, a number which means how many levels to traverse
);

// eager watcher
watch(
    obj,
    (newValue, oldValue) => {
        // executed immediately, then again when `source` changes
    },
    { immediate: true }, // because of this, it executes at render then on rerenders
);

// once watcher
watch(
    obj,
    (newValue, oldValue) => {
        // when `source` changes, triggers only once
    },
    { once: true }, // executes only once, when state changes
);
obj.count++;

// there is a better way to use watch if you have to use the state both as watched and inside watch
// note: watchEffect tracks dependencies only during synchronouse execution, if used with async,
//       callback, only dependenies before first "await" will be tracked
watchEffect(async () => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${(Math.random() * 10).toFixed()}`,
    );
    data.value = await response.json();
});

// difference between watch() and watchEffect() is that watch() only tracks dependencies that are,
// declared inside watch(dep1, dep2, depN, ()) but watchEffect() tracks everything.

// there is a way to stop execution of a stale action if state changes
watch(id, (newId) => {
    // when id changes, the fetch will still happen even though we will have a new one
    fetch(`/api/${newId}`).then(() => {});
});
watch(id, (newId) => {
    const controller = new AbortController();
    fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {});
    // with this function, from 3.5 vue you easily abort stale watchers
    // note:
    // onWatcherCleanup can be called only during sync exec of watchEffect or watch or until await,
    // if you have async callback inside watch/watchEffect
    onWatcherCleanup(() => {
        // abort stale request
        controller.abort();
    });
});
// there is also a method before 3.5 vue with onCleanup function
// note: onCleanup is not subject to async constraint if passed as function argument
watch(id, (newId, oldId, onCleanup) => {
    onCleanup(() => {});
});
watchEffect((onCleanup) => {
    onCleanup(() => {});
});

// 1. usually watchers are batched for efficiency
// 2. a watcher callback is called after parent component updates(if any) and before the owner
//    components DOM updates, so it means if you access the owner components own DOM inside a watcher,
//    DOM will be in pre-update state

// if you want to access components DOM after vue updates it in a watcher you can do it with:
watch(id, () => {}, {
    flush: "post",
});
watchEffect(() => {}, {
    flush: "post",
});
// watchEffect has an alternative so you dont need flush: "post"
watchPostEffect(() => {});
// if you want a watcher that fires synchronously before any vue updates you can do it with:
// note: avoid using sync watcher, they dont have batching, so affects performance
watch(id, () => {}, {
    flush: "sync",
});
watchEffect(() => {}, {
    flush: "sync",
});
// watchEffect has an alternative so you dont need flush: "sync"
watchSyncEffect(() => {});

// you can also stop a watch(if you have async callback)
// this one will be automatically stopped
watchEffect(() => {});
// ...this one will not!
setTimeout(() => {
    watchEffect(() => {});
}, 100);
// this way you can stop a watcher, here its useless but still
const unwatch = watchEffect(() => {});
unwatch();
</script>

<template>
    <p>
        Ask a yes/no question:
        <input v-model="question" :disabled="loading" />
    </p>
    <p>{{ answer }}</p>
</template>
