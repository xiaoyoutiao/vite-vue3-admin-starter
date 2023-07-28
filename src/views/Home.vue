<route lang="json">
{
  "path": "/",
  "meta": {
    "alias": "首页",
    "cacheable": true
  }
}
</route>

<template>
  <main>
    <form>
      <input type="text" placeholder="首页" />
    </form>

    <div class="box">
      <div class="item">222</div>
      <div class="item">333</div>
    </div>
  </main>
</template>

<script setup lang="ts">
const a = ref('11')
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100px;
  background-color: #000;
  .item {
    width: 100px;
    height: 100px;
    background-color: #fff;
  }
}
</style>
