import { onMounted, onUnmounted } from "vue";

export function useEventListener(
    target: Window,
    event: keyof WindowEventMap,
    callback: (e: Event) => void
) {
    // if you want, you can also make this support selector strings as target
    onMounted(() => target.addEventListener(event, callback));
    onUnmounted(() => target.removeEventListener(event, callback));
}
