<template>
  <el-container class="blank-layout">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.blank-layout {
  height: 100vh;
}
</style>
