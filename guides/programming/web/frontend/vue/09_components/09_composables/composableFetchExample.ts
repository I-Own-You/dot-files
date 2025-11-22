import { ref, watchEffect, toValue, Ref, MaybeRefOrGetter } from "vue";

export function useFetch(url: MaybeRefOrGetter) {
    const data = ref(null);
    const error = ref(null);

    const fetchData = () => {
        // reset state before fetching..
        data.value = null;
        error.value = null;

        // toValue() is needed for refs/functions return values to normalize refs and return values into normal values,
        // so url itself is a ref and is tracked by watchEffect() but toValue(url) retrievs the data for usage for fetch.
        // note: toValue() is useful when you pass more than ref, by passing only ref you could do url.value
        fetch(toValue(url))
            .then((res) => res.json())
            .then((json) => (data.value = json))
            .catch((err) => (error.value = err));
    };

    watchEffect(() => {
        // because we are inside watchEffect(), reactiv value "url" inside fetchData() is normalized with toVale() and then
        // tracked as normal reactive value inside a watcher
        fetchData();
    });

    return { data, error };
}
