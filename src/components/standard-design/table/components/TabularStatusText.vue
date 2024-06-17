<template>
  <div class="align-middle">
    <i
      class="status-icon"
      :class="{ [props.iconName]: 1 }"
      :style="{
        '--status-icon-color': props.color ? props.color : `var(--el-color-${props.type})`,
        fontSize: props.size
      }"
    />
    <span class="align-middle ml-1">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { type TextProps } from 'element-plus'

interface Props {
  type?: TextProps['type']
  color?: string
  iconName?: string
  size?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  iconName: 'i-mdi:checkbox-blank-circle',
  size: '8px'
})
</script>

<style scoped lang="scss">
.status-icon {
  --status-icon-color: var(--el-color-info);
  color: var(--status-icon-color);
}
</style>
