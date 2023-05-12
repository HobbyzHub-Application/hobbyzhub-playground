<script lang="js">

  export default {
    name: "App",
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
</template>

<style>
  html {
    overflow: auto !important;
  }
</style>
