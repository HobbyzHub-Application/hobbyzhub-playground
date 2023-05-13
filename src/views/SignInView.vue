<script lang="js">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import useNotificationStore from '../stores/notification-store';
    import useCurrentUserStore from '../stores/currentuser-store';

    export default {
        name: "SignInView",
        setup() {
            const signInDetails = ref({
                email: "",
                password: ""
            });
            const passwordShow = ref(false);
            const signInLoading = ref(false);
            const router = useRouter();

            // the notification store
            const notifStore = useNotificationStore();
            const { setShowNotificationStateTrue } = notifStore;

            // current user store
            const currentUserStore = useCurrentUserStore();
            const { populateUserDataAfterlogin } = currentUserStore;

            function signin() {
                signInLoading.value = true;
                fetch("http://149.28.232.132:8765/accountmanagement-service/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(signInDetails.value)
                }).then((response) => {
                    signInLoading.value = false;
                    if (response.status === 500) {
                        setShowNotificationStateTrue("Something Went Wrong. Please Try Again");
                        return null;
                    } else {
                        setShowNotificationStateTrue("Successfully Signed You In");
                        return response.json();
                    }
                }).then((data) => {
                    if (data !== null) {
                        populateUserDataAfterlogin(data.data);
                        if(data.data.newUser === true) {
                            router.push({ name: "FinishSetup" });
                        } else {
                            router.push({ name: "Homepage" });
                        }
                    }
                });
            }

            return {
                signInDetails, passwordShow, signInLoading, signin, router
            }
        }
    }
</script>

<template>
    <div class="h-full flex justify-center items-center">
        <v-card class="w-[40%] h-[48%]">
            <v-card-title>Sign In</v-card-title>
            <v-container>
                <v-text-field
                    color="primary"
                    label="Email Address"
                    variant="underlined"
                    v-model="signInDetails.email"></v-text-field>
                <v-text-field
                    color="primary"
                    label="Password"
                    variant="underlined"
                    :type="passwordShow ? 'text' : 'password'"
                    :append-inner-icon="
                        passwordShow ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append-inner="passwordShow = !passwordShow"
                    v-model="signInDetails.password"></v-text-field>
                <div
                    class="flex justify-center flex-col items-center space-y-2">
                    <v-btn
                        color="success"
                        variant="flat"
                        :loading="signInLoading"
                        :disabled="
                            signInDetails.email === '' ||
                            signInDetails.password === ''
                        "
                        @click="signin"
                        class="w-[40%]">
                        SignIn
                    </v-btn>
                    <p
                        class="text-primary underline underline-offset-2 hover:cursor-pointer"
                        @click="router.push({ name: 'GetStarted' })">
                        I Don't Have an Account
                    </p>
                </div>
            </v-container>
        </v-card>
    </div>
</template>
