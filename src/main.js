import { createApp } from "vue";
import App from "./App.vue";

// import for TailwindCSS
import "./style.css";

// import for Vuetify
import vuetify from "./config/vuetify";

// import for Vue Router
import router from "./config/router";

//import for Pinia
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
