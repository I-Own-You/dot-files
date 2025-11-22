<script setup lang="ts">
import { ref } from "vue";
import { useMouse } from "./composable";
import { useFetch } from "./composableFetchExample";

// each component using useMouse() will create ist copies of {x, y}
const { x, y } = useMouse();

const url = ref("/initial-url");
// this way you could trigger a refetch
const { data, error } = useFetch(url);
// you could also pass a getter funciton to fire refetch, it tracks props.id (if you would have it defined and pass)
// const { data, error } = useFetch(() => `/posts/${props.id}`);
// changing the ref would trigger a refresh as well
// url.value = "/another-url"
</script>

<template>
    <div>Mouse position is at: {{ x }}, {{ y }}</div>
    <div>{{ data }} {{ error }}</div>
</template>
