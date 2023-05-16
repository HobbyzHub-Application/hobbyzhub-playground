import { createRouter, createWebHistory } from "vue-router";
import GetStartedView from "../views/GetStartedView.vue";
import SignInView from "../views/SignInView.vue";
import VerificationMailView from "../views/VerificationMailView.vue";
import FinishSetupView from "../views/FinishSetupView.vue";
import HobbyzhubPlayView from "../views/HobbyzhubPlayView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/hobbyzhub-playground/",
      component: SignInView,
      name: "SignIn",
    },
    {
      path: "/hobbyzhub-playground/get-started/",
      component: GetStartedView,
      name: "GetStarted",
    },
    {
      path: "/hobbyzhub-playground/mail-verification/",
      component: VerificationMailView,
      name: "MailVerification",
    },
    {
      path: "/hobbyzhub-playground/play/finish-setup/",
      component: FinishSetupView,
      name: "FinishSetup",
    },
    {
      path: "/hobbyzhub-playground/play/homepage/",
      component: HobbyzhubPlayView,
      name: "Homepage",
    },
  ],
});

export default router;
