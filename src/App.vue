<script lang="js">
import NotificationComp from './components/NotificationComp.vue';

  export default {
    name: "App",
    components: {
      NotificationComp
    },
    setup() {

    }
  }
</script>

<template>
  <div class="h-screen w-screen">
    <div class="h-[8%] shadow-md"></div>
    <div class="h-[92%] rounded-md shadow-lg p-2 border-[1px] border-primary">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
  <teleport to="#notification">
    <NotificationComp />
  </teleport>
</template>

<style>
  html {
    overflow: auto !important;
  }
</style>
