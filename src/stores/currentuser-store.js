import { defineStore } from "pinia";
import { reactive, computed } from "vue";

const useCurrentUserStore = defineStore("CurrentUserStore", () => {
    // state
    const currentUserData = reactive({
        userName: "",
        userEmail: "",
        userAccessToken: "",
        userProfilePicture: "",
        userId: "",
    });

    // getters
    const getCurrentUserEmail = computed(() => currentUserData.userEmail);

    // setters
    function setUserName(username) {
        currentUserData.userName = username;
    }

    function setUserEmail(email) {
        currentUserData.userEmail = email;
    }

    function populateUserDataAfterlogin(data) {
        currentUserData.userName = data.userName;
        currentUserData.userEmail = data.userEmail;
        currentUserData.userAccessToken = data.accessToken;
        currentUserData.userProfilePicture = data.userProfilePicLink;
    }

    return {
        getCurrentUserEmail,
        setUserName,
        setUserEmail,
        populateUserDataAfterlogin,
    };
});

export default useCurrentUserStore;
