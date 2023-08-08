<route lang="json">
{
  "meta": {
    "logined": false,
    "layout": "BlankLayout",
    "static": true
  }
}
</route>

<template>
  <div>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { replace } = useRouter()

async function login() {
  userStore.isLogin = true
  await userStore.fetchRoutes()
  replace({ path: '/' })
}
</script>

<style scoped></style>
