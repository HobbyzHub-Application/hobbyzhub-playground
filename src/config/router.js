import { createRouter, createWebHistory } from "vue-router";
import GetStartedView from "../views/GetStartedView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/get-started/",
            component: GetStartedView,
            name: "GetStarted"
        }
    ]
});

export default router;