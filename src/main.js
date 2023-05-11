import { createApp } from "vue";
import App from "./App.vue";

// import for TailwindCSS
import "./style.css";

// import for Vuetify
import vuetify from "./config/vuetify";

// import for Vue Router
import router from "./config/router";

createApp(App).use(vuetify, router).mount("#app");
