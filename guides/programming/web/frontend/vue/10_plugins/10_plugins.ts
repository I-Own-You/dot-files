// plugin - code that adds app level functionality to vue
import { createApp } from "vue";
import myPlugin from "./myPlugin";

const app = createApp({});

// this is how to use a plugin
app.use(myPlugin, {
    greetings: {
        hello: "privet",
    },
});
