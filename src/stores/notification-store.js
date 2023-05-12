import { defineStore } from "pinia";
import { ref, computed } from "vue";

const useNotificationStore = defineStore("NotificationStore", () => {
  // state
  const showNotificationState = ref(false);
  const notificationMessage = ref("I love my dog very much");

  // getters
  const getShowNotificationState = computed(() => showNotificationState.value);

  const getNotificationMessage = computed(() => notificationMessage.value);

  // actions - setters
  function setShowNotificationStateTrue(message) {
    notificationMessage.value = message;
    showNotificationState.value = true;

    setTimeout(() => { showNotificationState.value = false }, 5000);
  }

  function setShowNotificationStateFalse() {
    showNotificationState.value = false;
  }

  return {
    getShowNotificationState,
    getNotificationMessage,
    setShowNotificationStateTrue,
    setShowNotificationStateFalse,
  };
});

export default useNotificationStore;
