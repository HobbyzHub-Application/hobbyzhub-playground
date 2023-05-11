<script lang="js">
import { ref } from 'vue';

export default {
  name: "App",
  setup() {
    const tabs = ref(null);

    return {
      tabs
    }
  }
}
</script>

<template>
  <div class="h-screen w-screen">
    <div class="h-[8%] shadow-md">
      <v-tabs 
        v-model="tabs"
        fixed-tabs>
        <v-tab value="followers">Followers & Followings</v-tab>
        <v-tab value="categories">Hobby Categories</v-tab>
        <v-tab value="chats">App Chats</v-tab>
      </v-tabs>
    </div>
    <div class="h-[92%] rounded-md shadow-lg p-2 border-[1px] border-primary">
      <v-window v-model="tabs">
        <v-window-item value="followers">One</v-window-item>
        <v-window-item value="categories">Two</v-window-item>
        <v-window-item value="chats">Three</v-window-item>
      </v-window>
    </div>
  </div>
</template>

<style>
  html {
    overflow: auto !important;
  }
</style>