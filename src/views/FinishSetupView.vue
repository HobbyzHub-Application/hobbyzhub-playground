<script lang="js">
    import { reactive, ref } from 'vue';
    import useCurrentUserStore from '../stores/currentuser-store';
    import FilePickerComp from '../components/FilePickerComp.vue';
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
    import useNotificationStore from "../stores/currentuser-store.js";

    export default {
        name: "FinishSetup",
        components: {
            FilePickerComp
        },
        setup() {
            const otherUserDetails = reactive({
                userId: "",
                firstName: "",
                lastName: "",
                birthdate: "",
                gender: "",
                pushToken: "",
                profilePicB64: ""
            });
            const finishSetupLoading = ref(false);

            // current user store logic
            const currentUserStore = useCurrentUserStore();
            const {
                getUserFirstName,
                getUserSecondName,
                getUserProfilePicture,
                getUserAccessToken
            } = storeToRefs(currentUserStore);

            // router pre-desposition
            const router = useRouter();

            // notification store logic
            const notifStore = useNotificationStore();
            const { setShowNotificationStateTrue } = notifStore;

            function finishSetup() {
                finishSetupLoading.value = true;
                fetch("http://149.28.232.132:8765/accountmanagement-service/api/user/finish-setup", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: getUserAccessToken
                    },
                    body: JSON.stringify(otherUserDetails.value)
                }).then((response) => {
                    if(response.status === 200) {
                        setShowNotificationStateTrue("Successfully Completed Your User Details");
                    } else {
                        setShowNotificationStateTrue("Error Completing Your User Details");
                    }
                }).then(() => {
                    // make the fetch request to upload the image to
                })
            }

            return {
                otherUserDetails, getUserFirstName, getUserSecondName, getUserProfilePicture, router, finishSetup, finishSetupLoading
            }
        },
        mounted() {
            this.otherUserDetails.firstName = this.getUserFirstName;
            this.otherUserDetails.lastName = this.getUserSecondName;
            this.otherUserDetails.profilePicB64 = this.getUserProfilePicture;
        }
    }
</script>

<template>
    <div class="h-full flex justify-center">
        <v-card class="w-[30%] h-[88%]">
            <v-card-title> Finish Creating Your Account </v-card-title>
            <FilePickerComp />
            <div class="flex flex-col p-2">
                <v-text-field
                    model-value="John Doe"
                    label="First Name"
                    variant="outlined"
                    disabled></v-text-field>
                <v-text-field
                    model-value="John Doe"
                    label="Last Name"
                    variant="outlined"
                    disabled></v-text-field>
            </div>
            <div class="flex flex-col p-2">
                <v-text-field
                    model-value="John Doe"
                    label="First Name"
                    variant="outlined"
                    disabled></v-text-field>
                <v-radio-group
                    label="Gender"
                    inline>
                    <v-radio
                        label="Male"
                        value="male"></v-radio>
                    <v-radio
                        label="Female"
                        value="female"></v-radio>
                    <v-radio
                        label="Other"
                        value="other"></v-radio>
                </v-radio-group>
            </div>
            <div class="flex items-center flex-col justify-center">
                <v-btn
                    :ripple="false"
                    variant="flat"
                    color="primary"
                    @click="finishSetup"
                    :loading="finishSetupLoading"
                    >Finish Setup</v-btn
                >
                <v-btn
                    variant="text"
                    :ripple="false"
                    @click="router.push({ name: 'Homepage' })"
                    class="hover:underline">
                    Skip For Now
                </v-btn>
            </div>
        </v-card>
    </div>
</template>
