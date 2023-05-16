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

    const getUserFirstName = computed(function depopulateUserName() {
        const fullName = currentUserData.userName; // e.g. "Martin Bikathi"

        return fullName.split(" ")[0]; // return "Martin"
    });

    const getUserSecondName = computed(function depopulateUserName() {
        const fullName = currentUserData.userName; // e.g. "Martin Bikathi"

        return fullName.split(" ")[1]; // return "Bikathi"
    });

    const getUserProfilePicture = computed(function getUserProfilePicture() {
        return currentUserData.userProfilePicture;
    });

    const getUserAccessToken = computed(function getUserAccessToken() {
        return currentUserData.userAccessToken;
    });
    

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
        currentUserData.userId = data.userId;
    }

    function depopulateUserDataOnLogout() {
        currentUserData.userName = "";
        currentUserData.userEmail = "";
        currentUserData.userAccessToken = "";
        currentUserData.userProfilePicture = "";
        currentUserData.userId = "";
    }

    return {
        getCurrentUserEmail,
        getUserFirstName,
        getUserSecondName,
        getUserProfilePicture,
        getUserAccessToken,
        setUserName,
        setUserEmail,
        populateUserDataAfterlogin,
        depopulateUserDataOnLogout
    };
});

export default useCurrentUserStore;
