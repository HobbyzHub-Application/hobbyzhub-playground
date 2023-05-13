import { defineStore } from "pinia";
import { reactive, computed } from "vue";

const useCurrentUserStore = defineStore("CurrentUserStore", () => {
    // state
    const currentUserData = reactive({
        userName: "",
        userEmail: "",
        userToken: "",
        userProfilePicture: "",
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

    return {
        getCurrentUserEmail,
        setUserName,
        setUserEmail,
    };
});

export default useCurrentUserStore;
