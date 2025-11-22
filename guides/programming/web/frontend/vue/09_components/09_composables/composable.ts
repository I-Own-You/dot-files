// composable - a way to reuse stateful logic using vue compisition api
// composable - must start with "use"
import { ref, onMounted, onUnmounted } from "vue";
import { useEventListener } from "./composableHelperEvent";

// by convention, composable function names start with "use"
export function useMouse() {
    // state encapsulated and managed by the composable
    const x = ref(0);
    const y = ref(0);

    // a composable can update its managed state over time.
    // function update(event) {
    //     x.value = event.pageX;
    //     y.value = event.pageY;
    // }
    // a composable can also hook into its owner component's
    // lifecycle to setup and teardown side effects.
    // onMounted(() => window.addEventListener("mousemove", update));
    // onUnmounted(() => window.removeEventListener("mousemove", update));

    // above can be also done with a composable itself
    useEventListener(window, "mousemove", (event) => {
        x.value = (event as MouseEvent).pageX;
        y.value = (event as MouseEvent).pageY;
    });

    // expose managed state as return value
    return { x, y };
}

// notes:
// 1. if you work on ssr, dom-specific side effects must be run in POST MOUNT lifecycle hooks, ex: onMounted(),
//    so you need acces to DOM
// 2. you must always cleanup side effects in onUnmounted()
// 3. composables should be called only in script setup and synchronously contexts for:
//    1. performance reasons
//    2. lifecycle hooks can be registered to composables
