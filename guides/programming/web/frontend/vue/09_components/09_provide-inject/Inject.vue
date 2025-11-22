<script setup>
import { inject } from "vue";

// this way you inject(get) the value provided somewhere
const message = inject("message");

// if you dont know if there is a value provided for a key you can define one
const defaultMessage = inject("message", "default message");
// if the default value is gonna be a function value or class, you can optimize injectin in case you dont use the value
// with third argument inject(,,true)
const defaultOptimized = inject("key", () => new ExpensiveClass(), true);

// if there are nested components taht provide value with same key, the nearest will take precedence
</script>
