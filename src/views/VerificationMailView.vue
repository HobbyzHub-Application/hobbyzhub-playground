<script lang="js">
    import { ref, watch } from 'vue';
    import useCurrentUserStore from '../stores/currentuser-store';
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';

    export default {
        name: "VerificationMailView",
        setup() {
            const randomNumber = ref(Math.floor(100000 + Math.random() * 900000));
            const userInputNumber = ref("");
            const disableVerificationButton = ref(true);
            const activationLoading = ref(false);
            const sendEmailLoading = ref(false);
            const sendEmailDisabled = ref(false);
            const router = useRouter();

            // current user store
            const currentUserStore = useCurrentUserStore();
            const { getCurrentUserEmail } = storeToRefs(currentUserStore);

            function sendEmail() {
                sendEmailLoading.value = true;
                const requestUrl =
                    `http://149.28.232.132:8765/accountmanagement-service/api/auth/send-email/${ getCurrentUserEmail.value }/${ randomNumber.value }`;
                console.log("Verification url: " + requestUrl);

                fetch(requestUrl, {
                    method: "POST",
                    headers: {
                        Intent: "Verify-Email"
                    }
                }).then((response) => {
                    if(response.status === 200) {
                        sendEmailLoading.value = false;
                        sendEmailDisabled.value = true;
                        setTimeout(() => {
                            sendEmailDisabled.value = false;
                        }, 60000);
                    }
                });
            }

            function activateUserAcount() {
                activationLoading.value = true;
                const requestUrl = 
                    `http://149.28.232.132:8765/accountmanagement-service/api/auth/verify-account/${ getCurrentUserEmail.value }`;
                fetch(requestUrl, {
                    method: "PUT",
                }).then((response) => {
                    if(response.status === 200) {
                        // send the user to where they login
                        router.push({ name: "SignIn" });
                    }
                });
            }

            // watcher
            watch(userInputNumber, (newValues) => {
                if(parseInt(newValues) === randomNumber.value) {
                    disableVerificationButton.value = false;
                } else {
                    disableVerificationButton.value = true;
                }
            });

            return {
                sendEmail, userInputNumber, disableVerificationButton, activateUserAcount, activationLoading,
                sendEmailLoading, sendEmailDisabled, randomNumber

            }
        },
        
        mounted(){
            console.log(this.randomNumber);
        }
    }
</script>

<template>
    <div class="h-full flex justify-center items-center">
        <v-card class="w-[40%] h-[51%]">
            <v-card-title>Email Verification</v-card-title>
            <v-alert
                class="mx-2 text-sm"
                type="info"
                title="Verification Email Alert">
                Click the button below to get a verification code in your email.
                <div class="mt-1">
                    <v-btn
                        :ripple="false"
                        @click="sendEmail"
                        :loading="sendEmailLoading"
                        :disabled="sendEmailDisabled"
                        :append-icon="sendEmailDisabled ? 'mdi-check' : ''"
                        >Send Email</v-btn
                    >
                </div>
            </v-alert>
            <div class="mt-2 mx-4">
                <v-text-field
                    variant="underlined"
                    label="6-Digit Verification Code"
                    maxlength="6"
                    v-model="userInputNumber"></v-text-field>
            </div>
            <div class="flex justify-center items-center">
                <v-btn
                    :ripple="false"
                    variant="flat"
                    :disabled="disableVerificationButton"
                    @click="activateUserAcount"
                    :loading="activationLoading">
                    Verify My Code
                </v-btn>
                <p class="text-xs text-warning ml-2">Invalid Code</p>
            </div>
        </v-card>
    </div>
</template>
