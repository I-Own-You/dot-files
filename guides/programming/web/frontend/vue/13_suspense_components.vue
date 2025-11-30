<template>
    <!-- Suspense builtin components let us awaits an async component and display a fallback content while our,
         async component is loading -->
    <!-- Dashboard is the default content which tries to load,
         lower is the fallback content which loads if default didnt yet.
         note: you could acutlaly specify #default since inside Suspense they are slots, but its not needed -->
    <Suspense>
        <!-- async component can opt out of being controlled by Suspense by sepcifying inside Dashboard,
             suspensible: false in its options -->
        <Dashboard />
        <template #fallback> Loading... </template>
    </Suspense>
    <!-- how Suspense works:
         1. on initial render: Suspense renders default content inside memory 
         2. if no async dependencies, Suspense enters "resolved state" and renders default conent
         3. if async dependencies are encountered, Suspense enter "pending" state and fallback content is displayed
         4. when all async dependencies are resolved, Suspense enters "resolved" state and renders default content
         5. if Suspense is in "resolved" state, Suspense will revert into "pending" state only if root node of
            default content is replaced, new async dependencies in the tree wont trigger "pending" state again.
         6. if Suspense reverted to "pending" state, it wont show the fallback content instantly, instead, Suspense
            will show the previous versioin of default content until async dependencies are again resolved and new content
            of default can be rendered or if it takes too much time and fallback content is shown.
            You can trigger after how much time fallback will be shown again with "timeout" prop of Suspense, 0 will mean,
            to show it instantly.
     -->

    <!-- Suspense also emits 3 events: pending, resolve, fallback.
         It can be used to do something -->

    <!-- if an error happens, Suspense cannot resolve it by itself, but you can use either:
         errorCaptured/onErrorCaptured hook to handle async erorr inside the componente where Suspense is used -->

    <!-- you can also use Suspense,Transitioin,KeepAlive together, but the order matters
         example: -->
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition mode="out-in">
                <KeepAlive>
                    <Suspense>
                        <!-- main content -->
                        <component :is="Component"></component>

                        <!-- loading state -->
                        <template #fallback> Loading... </template>
                    </Suspense>
                </KeepAlive>
            </Transition>
        </template>
    </RouterView>

    <!-- its also important to wrap async component with Suspense if they are inside another async components if you want,
         them to be handled and to have their own fallback or to be handled by parent Suspense in case you put
         "suspensible" attribute on child Suspense -->
    <Suspense>
        <component is="DynamicAsyncOuter">
            <!-- without "suspensible", it would be considered synchronous code with its own fallback content,
                 which means if they both render at the same it could lead to empty nodes and independent work,
                 its not neccessarily bad if you want a spearate fallback and separate events since with "suspensible",
                 events are handled by parent where "suspensible" is omited -->
            <Suspense suspensible>
                <component is="DynamicAsyncInner" />
            </Suspense>
        </component>
    </Suspense>
</template>
