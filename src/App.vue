<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn'
const authStore = useAuthStore()

authStore.setPermissions(['create', 'update', 'read', 'delete'])

const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>
