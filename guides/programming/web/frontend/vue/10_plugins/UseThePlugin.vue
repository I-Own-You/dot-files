<script setup lang="ts">
import { inject } from "vue";

const myPlugin = inject("myPlugin");

console.log(myPlugin.greetings.hello); // ignore the error, app is created incorreclty
</script>

<template>
    <!-- instead of $translate('greetings.hello') will be the value from greetings["hello"] from registrerd options
         from 10_plugins.ts where you registered the plugin -->
    <h1>{{ $translate("greetings.hello") }}</h1>
    <!-- ignore the error, the app is created incorreclty -->
</template>
