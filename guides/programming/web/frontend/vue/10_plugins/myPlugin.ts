// usually its created in its file with a name and default exported as object with install() method

import { App } from "vue";

export default {
    install: (app: App<Element>, options) => {
        // inject a globally available $translate() method
        app.config.globalProperties.$translate = (key: string) => {
            // retrieve a nested property in `options`
            // using `key` as the path
            return key.split(".").reduce((o, i) => {
                if (o) return o[i];
            }, options);
        };

        // you can also give this functionality to apps beside template to call it programatically
        app.provide("myPlugin", options);
    },
};
