<route lang="json">
{
  "meta": {
    "layout": "MainLayout",
    "alias": "页面不存在",
    "static": true
  }
}
</route>

<template>
  <div class="main">
    <img src="/src/assets/404.png" alt="" />
    <div class="flex flex-col ml-15">
      <span class="text-6 font-600">找不到页面</span>
      <span class="leading-12">抱歉！无法找到该页面。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { replace } = useRouter()
const toHome = () => replace({ path: '/' })
</script>

<style scoped lang="scss">
.main {
  white-space: nowrap;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
