<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
const isMobile = false;

defineOptions({});
</script>

<template>
    <button @click="open = true">Open Modal</button>

    <!-- Teleport builtin component lets vue teleport nodes into different node in whole html strucutre, but only visually,
         it means it only affects UI, the logic is not affected(events, state, .etc) -->
    <!-- 1. "to" attribute accepts a string for html node(tag, id, class) or actual component
         2. attribute given to "to" must be mounted before the content inside Teleport -->
    <Teleport to="body">
        <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
    </Teleport>

    <!-- you can also disable teleport for mobiles while preserving for other platforms with "disabled" attribute -->
    <Teleport to="body" :disabled="isMobile">
        <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
    </Teleport>

    <!-- you can also have multiple teleported elements, they all are added one after another -->
    <Teleport to="body">
        <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
    </Teleport>
    <Teleport to="body">
        <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
    </Teleport>

    <!-- actually you can assign a node that is mounted later but in the same mount/tick space with "defer" -->
    <Teleport to="#later" defer>
        <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
    </Teleport>
    <div id="later"></div>
</template>

<style scoped>
.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
}
</style>
