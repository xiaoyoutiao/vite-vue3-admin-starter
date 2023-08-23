<template>
  <el-tooltip effect="dark" :content="props.tooltip" placement="top-start">
    <span class="align-middle cursor-pointer">
      <span class="align-middle">{{ props.column.label }}</span>
      <span class="i-mdi:information-variant-circle-outline align-middle text-18px ml-4px"></span>
    </span>
  </el-tooltip>
</template>

<script setup lang="ts">
import type { ElTableColumn } from 'element-plus'
import { type ExtractPropTypes } from 'vue'

const props = defineProps<{
  column: ExtractPropTypes<typeof ElTableColumn>
  tooltip?: string
}>()
</script>
