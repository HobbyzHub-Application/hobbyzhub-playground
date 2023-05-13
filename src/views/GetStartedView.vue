<script lang="js">
    import { ref, watch } from 'vue';
    import useNotificationStore from '../stores/notification-store';
    import useCurrentUserStore from '../stores/currentuser-store';
    import { useRouter } from 'vue-router';

    export default {
      name: "GetStartedView",
      setup() {
        const signupLoading = ref(false);
        const newPasswordShow = ref(false);
        const disableSignupButton = ref(true);
        const signupSuccess = ref(false);

        // notification store logic
        const notifStore = useNotificationStore();
        const { setShowNotificationStateTrue } = notifStore;

        // signup details
        const signupDetails = ref({
          email: "",
          password: ""
        });

        // router
        const router = useRouter();

        // current user store logic
        const currentUserStore = useCurrentUserStore();
        const { setUserEmail } = currentUserStore;

        // watch inputs to enable or disable signup button
        watch([
          () => signupDetails.value.email,
          () => signupDetails.value.password
        ], (newValues) => {
          if (newValues[0] !== "" && newValues[1] !== "") {
            disableSignupButton.value = false;
          } else {
            disableSignupButton.value = true;
          }
        });

        function signup() {
          signupLoading.value = true;
          // code to signup the user with API an call
          fetch("http://149.28.232.132:8765/accountmanagement-service/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(signupDetails.value)
          }).then((response) => {
            signupLoading.value = false;
            if (response.status === 409) {
              setShowNotificationStateTrue("Account With A Similar Email Already Exists");
              return null;
            } else if (response.status === 500) {
              setShowNotificationStateTrue("Possible Error Signing You Up. Please Try Again");
              return null;
            } else {
              setShowNotificationStateTrue("Successfully Signed You Up");
              setUserEmail(signupDetails.value.email);
              signupSuccess.value = true;
              return response.json();
            }
          }).then((data) => {
            if (data !== null) {
              console.log(`Response Data: ${data}`);
              setUserEmail(signupDetails.value.email);
              router.push({ name: "MailVerification" });
            }
          });
        }

        return {
          signupLoading, newPasswordShow, signup, signupDetails, disableSignupButton, signupSuccess,
          setShowNotificationStateTrue, router
        }
      }
    }
</script>

<template>
    <div class="h-full flex justify-center items-center">
        <v-card class="w-[40%] h-[52%]">
            <v-card-title>Sign Up</v-card-title>
            <v-card-subtitle
                class="text-primary underline underline-offset-2 hover:cursor-pointer"
                @click="router.push({ name: 'SignIn' })"
                >I Already Have An Account</v-card-subtitle
            >
            <v-container>
                <v-text-field
                    color="primary"
                    label="Email Address"
                    variant="underlined"
                    v-model="signupDetails.email"></v-text-field>
                <v-text-field
                    color="primary"
                    label="Password"
                    variant="underlined"
                    :type="newPasswordShow ? 'text' : 'password'"
                    :append-inner-icon="
                        newPasswordShow ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append-inner="newPasswordShow = !newPasswordShow"
                    v-model="signupDetails.password"></v-text-field>
                <div
                    class="flex justify-center flex-col items-center space-y-2">
                    <v-btn
                        color="success"
                        variant="flat"
                        :loading="signupLoading"
                        :disabled="disableSignupButton"
                        @click="signup"
                        class="w-[40%]">
                        Signup
                    </v-btn>
                    <div v-if="signupSuccess === true">
                        <v-btn
                            append-icon="mdi-arrow-right"
                            variant="text"
                            class="@hover:bg-transparent @hover:underline @hover:underline-offset-2">
                            Proceed
                        </v-btn>
                    </div>
                </div>
            </v-container>
        </v-card>
    </div>
</template>
