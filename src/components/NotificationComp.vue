<script lang="js">
  import useNotificationStore from "../stores/notification-store.js";
  import { storeToRefs } from 'pinia'

    export default {
      name: "NotificationComp",
      setup() {
        const notifStore = useNotificationStore();

        // destructure things in the store
        // destructure refs and getters
        const { getNotificationMessage, getShowNotificationState } = storeToRefs(notifStore);

        // destructure setters
        const { setShowNotificationStateFalse } = notifStore;

        return {
            getNotificationMessage, setShowNotificationStateFalse, getShowNotificationState
        }
      }
    }
</script>

<template>
  <div
    class="absolute bottom-1 left-[35%]"
    v-show="getShowNotificationState">
    <v-banner
      lines="one"
      icon="mdi-bell"
      color="info"
      class="my-4 w-[50%]">
      <div class="flex items-center h-full mr-2">
        {{ getNotificationMessage }}
      </div>
      <template v-slot:actions>
        <v-btn
          variant="flat"
          color="info"
          @click="setShowNotificationStateFalse"
          >Hide
        </v-btn>
      </template>
    </v-banner>
  </div>
</template>
