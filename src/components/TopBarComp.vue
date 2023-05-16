<script lang="js">
    import { ref } from 'vue';
    import useCurrentUserStore from '../stores/currentuser-store';
    import { useRouter, useRoute } from 'vue-router';

    export default {
        name: "TopBarComp",
        setup() {
            // current user store logic
            const currentUserStore = useCurrentUserStore();
            const { depopulateUserDataOnLogout } = currentUserStore;
            const logoutLoading = ref(false);

            // router
            const router = useRouter();
            const route = useRoute();

            function logoutUser() {
                logoutLoading.value = true;
                depopulateUserDataOnLogout();
                logoutLoading.value = false;

                router.push({ name: "SignIn" });
            }

            return {
                depopulateUserDataOnLogout, logoutUser, logoutLoading, route
            }
        }
    }
</script>

<template>
    <div class="h-[8%] shadow-md p-2 flex items-center justify-between">
        <h1 class="inline-flex items-center space-x-2">
            <span class="font-abeezee text-lg">Hobbyzhub Playground</span>
            <img
                src="../assets/playground-logo.svg"
                alt="playground-logo"
                class="w-8" />
        </h1>
        <v-btn
            :ripple="false"
            color="warning"
            variant="flat"
            @click="logoutUser"
            :loading="logoutLoading"
            v-if="route.path.includes('/play/')"
            >Logout</v-btn
        >
    </div>
</template>
