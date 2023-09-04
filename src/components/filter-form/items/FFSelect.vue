<template>
  <el-select
    :model-value="value"
    :placeholder="placeholder"
    :no-data-text="noDataText"
    :loading="loading"
    size="small"
    v-bind="restProps"
    @change="onChange"
  >
    <template #prefix>
      <span>{{ column.label }}</span>
    </template>

    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
import type { ISelectProps } from 'element-plus'

import { type SelectColumn, FLTER_FORM_INJECT_KEY } from '../form'

const Texts = {
  placeholder: '请选择',
  noDataText: '暂无选项'
} as const

interface Props {
  column: SelectColumn
}

const formProvider = inject(FLTER_FORM_INJECT_KEY)
const props = defineProps<Props>()
const { column } = toRefs(props)
const restProps = column.value.props as Omit<ISelectProps, 'modelValue' | 'loading'>

const value = computed(() => formProvider?.model.value[column.value.prop])
const placeholder = computed(() => column?.value?.props?.placeholder ?? Texts.placeholder)
const noDataText = computed(() => column?.value?.props?.noDataText ?? Texts.noDataText)
const loading = computed(() => formProvider?.manager.value[column.value.prop].loading ?? false)
const options = computed(() => formProvider?.manager.value[column.value.prop].options ?? [])

function onChange(value: unknown) {
  formProvider?.setModelValue(column.value.prop, value)
}
</script>

<style scoped lang="scss">
.ff-select-option {
}
</style>
