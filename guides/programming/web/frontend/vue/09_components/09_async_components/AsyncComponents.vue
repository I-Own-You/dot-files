<script setup>
import { defineAsyncComponent, hydrateOnIdle } from "vue";

// using defineAsyncComponent() you can lazy load any component
// note: lazy components are best using in pair with Suspende mechanic
const AdminPage = defineAsyncComponent(() =>
    import("./somePathToComponent/AdminPage.vue")
);

// you can also have different options to handle lazy loadiing better
const AsyncComp2 = defineAsyncComponent({
    // the loader function
    loader: () => import("./somePathToComponent/AdminPage.vue"),
    // A component to use while the async component is loading
    loadingComponent: LoadingComponent,
    // Delay before showing the loading component. Default: 200ms.
    delay: 200,
    // A component to use if the load fails
    errorComponent: ErrorComponent,
    // The error component will be displayed if a timeout is provided and exceeded. Default: Infinity.
    timeout: 3000,
    // pass a hydration style(vue has certain)
    hydrate: hydrateOnIdle(), // you can pass timeout inside hydrateOnIdle()
    // onError,
    // suspensible
});

// you can also lazy load globally where you create the app
// app.component('MyComponent', defineAsyncComponent(() =>
//   import('./components/MyComponent.vue')
// ))
</script>

<template>
    <AdminPage />
</template>
