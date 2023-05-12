<script lang="js">
  import { ref, watch } from 'vue';

    export default {
      name: "GetStartedView",
      setup() {
        const signupLoading = ref(false);
        const newPasswordShow = ref(false);
        const disableSignupButton = ref(true);
        const signupSuccess = ref(false);

        // signup details
        const signupDetails = ref({
          email: "",
          password: ""
        });

        // watch inputs to enable or disable signup button
        watch([
          () => signupDetails.value.email,
          () => signupDetails.value.password
        ], (newValues) => {
          if(newValues[0] !== "" && newValues[1] !== "") {
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
            if(response.status !== 200) {
              console.log("Error from signup response...");
              signupLoading.value = false;
            }

            signupSuccess.value = true;
            return response.json();
          }).then((data) => {
            console.log(`Response Data: ${ data }`);
          }).catch((error) => {
            console.log("Error occured: " + error);
          });
        }

        return {
          signupLoading, newPasswordShow, signup, signupDetails, disableSignupButton, signupSuccess
        }
      }
    }
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <v-card class="w-[40%] h-[47%]">
      <v-card-title>Sign Up</v-card-title>
      <v-card-subtitle
        class="text-primary underline underline-offset-2 hover:cursor-pointer"
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
          :append-inner-icon="newPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="newPasswordShow = !newPasswordShow"
          v-model="signupDetails.password"></v-text-field>
        <div class="flex justify-center flex-col items-center">
          <v-btn
            color="success"
            variant="flat"
            :loading="signupLoading"
            :disabled="disableSignupButton"
            @click="signup"
            class="w-[40%]">
            Signup
          </v-btn>
        </div>
      </v-container>
    </v-card>
  </div>
</template>
