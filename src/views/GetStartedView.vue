<script lang="js">
  import { ref, watch } from 'vue';

    export default {
      name: "GetStartedView",
      setup() {
        const signupLoading = ref(false);
        const newPasswordShow = ref(false);

        // signup details
        const signupDetails = ref({
          email: "",
          password: ""
        });
        const agreeCheckbox = ref(false);

        // watch inputs to enable signup button
        watch()

        function signup() {
          // TODO : Add logic here
        }

        return {
          signupLoading, newPasswordShow, signup, signupDetails, agreeCheckbox
        }
      }
    }
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <v-card class="w-[40%] h-[60%]">
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
          <v-checkbox
            color="secondary"
            label="I agree to site terms and conditions"
            v-model="agreeCheckbox"></v-checkbox>
          <v-btn
            color="success"
            variant="flat"
            :loading="signupLoading"
            disabled>
            Sign Up
          </v-btn>
        </div>
      </v-container>
    </v-card>
  </div>
</template>
