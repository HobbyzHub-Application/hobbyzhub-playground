import { createRouter, createWebHistory } from "vue-router";
import GetStartedView from "../views/GetStartedView.vue";
import SignInView from "../views/SignInView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/hobbyzhub-playground/",
      component: SignInView,
      name: "GetStarted",
    },
    {
      path: "/hobbyzhub-playground/get-started/",
      component: GetStartedView,
      name: "GetStarted",
    },
  ],
});

export default router;
