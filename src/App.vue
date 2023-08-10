<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn'
const locale = zhCn
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
