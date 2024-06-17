<template>
  <el-table-column v-bind="props" :align="align">
    <template #header="scope" v-if="slots.header || headerTooltip">
      <slot v-bind="scope" name="header">
        <TabelColumnTooltip v-if="headerTooltip" :column="props" :tooltip="headerTooltip" />
      </slot>
    </template>

    <template #default="scope">
      <slot v-bind="scope" :value="scope.row[scope?.column?.property]" name="default">
        <span>
          {{ accessContent(scope.row[scope.column.property]) }}
          <i
            title="复制"
            v-if="props.copyable"
            class="copyable i-mdi:content-copy"
            @click="onClickCopy(scope.row[scope?.column?.property])"
          />
        </span>
      </slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ElNotification } from 'element-plus'

import { type ElTableColumnProps } from './types'
import TabelColumnTooltip from './TabelColumnTooltip.vue'

import { formatCurrency, type CurrencyOptions } from '@/utils/currency'
import { isBoolean } from 'xe-utils'

interface Props extends ElTableColumnProps {
  headerTooltip?: string
  copyable?: boolean
  currency?: CurrencyOptions | true
}

const props = withDefaults(defineProps<Props>(), {})

const slots = useSlots()

const rowValue = ref()

const accessContent = (value: string) => {
  rowValue.value = value

  if (props.currency) {
    return formatCurrency(value, isBoolean(props.currency) ? undefined : props.currency)
  }

  return value ?? '--'
}

const align = computed(() => {
  if (props.align) return props.align
  if (typeof rowValue.value == 'number') {
    return 'right'
  }
  return 'left'
})

const onClickCopy = async (source: string) => {
  const { copy, copied } = useClipboard({ source })
  await copy()
  if (copied.value) {
    ElNotification({
      title: '成功',
      type: 'success',
      message: '内容已复制到剪贴板',
      position: 'bottom-left'
    })
  }
}
</script>

<style scoped lang="scss">
.copyable {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 12px;
  cursor: pointer;
  z-index: 10;
  transform: scale(0.9);
}
</style>
