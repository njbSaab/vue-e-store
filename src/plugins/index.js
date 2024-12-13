/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "@/stores";
import router from "@/router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

export function registerPlugins(app) {
  app.use(vuetify).use(router).use(pinia).use(autoAnimatePlugin);
}
