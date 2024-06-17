<template>
  <div class="tb-setting-bar">
    <div class="flex flex-1 items-center">
      <i class="i-mdi:drag-vertical-variant text-2xl text-blue-800"></i>
      <slot></slot>
    </div>

    <div class="icon-group">
      <el-tooltip effect="dark" content="刷新当前页" placement="top">
        <span class="icon-item" @click="emit('refresh')"><i class="i-mdi:refresh" /></span>
      </el-tooltip>

      <el-divider direction="vertical" />

      <el-tooltip effect="dark" content="列配置" placement="top">
        <span class="icon-item" @click="emit('change')"
          ><i class="i-mdi:cog-transfer-outline"
        /></span>
      </el-tooltip>

      <el-divider direction="vertical" />

      <el-tooltip effect="dark" content="最大化" placement="top">
        <span class="icon-item" @click="emit('fullscreen')"><i class="i-mdi:fullscreen" /></span>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'change'): void
  (e: 'fullscreen'): void
}>()
</script>

<style scoped lang="scss">
.tb-setting-bar {
  padding: 5px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .icon-group {
    margin-left: auto;
    padding: 5px 10px;
    white-space: nowrap;
    .icon-item {
      vertical-align: middle;
      text-align: center;
      display: inline-block;
      width: 1.8em;
      height: 1.8em;
      font-size: 18px;
      border-radius: 5px;

      cursor: pointer;
      &:hover {
        background-color: #e0e2e5;
      }
    }
  }
}
</style>
