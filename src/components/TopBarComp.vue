<script lang="js">
    import { ref } from 'vue';
    import useCurrentUserStore from '../stores/currentuser-store';
    import { useRouter } from 'vue-router';

    export default {
        name: "TopBarComp",
        setup() {
            // current user store logic
            const currentUserStore = useCurrentUserStore();
            const { depopulateUserDataOnLogout } = currentUserStore;
            const logoutLoading = ref(true);

            // router
            const router = useRouter();

            function logoutUser() {
                logoutLoading.value = true;
                depopulateUserDataOnLogout();
                logoutLoading.value = false;

                router.push({ name: "GetStarted" });
            }

            return {
                depopulateUserDataOnLogout, logoutUser, logoutLoading
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
            >Logout</v-btn
        >
    </div>
</template>
