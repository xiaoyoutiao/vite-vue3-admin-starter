<template>
  <el-date-picker
    class="ff-date-picker"
    style="--el-date-editor-width: 280px"
    :modelValue="date"
    :placeholder="placeholder"
    :prefix-icon="column.label ? h('div', column.label) : undefined"
    size="small"
    @update:modelValue="onChange"
    v-bind="restProps"
  />
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { DatePickerProps } from 'element-plus'

import { type DatePickerColumn, FLTER_FORM_INJECT_KEY } from '../form'

const Texts = {
  placeholder: '请选择'
} as const

interface Props {
  column: DatePickerColumn
}

const formProvider = inject(FLTER_FORM_INJECT_KEY)
const props = defineProps<Props>()
const { column } = toRefs(props)
const restProps = column.value.props as Omit<
  DatePickerProps,
  'modelValue' | 'placeholder' | 'prefixIcon'
>
const date = computed(() => formProvider?.model.value[column.value.prop])

const placeholder = computed(() => column?.value?.props?.placeholder ?? Texts.placeholder)

function onChange(val: unknown) {
  formProvider?.setModelValue(column.value.prop, val)
}
</script>

<style lang="scss" scoped>
.ff-date-picker {
  &:deep(.el-range__icon) {
    div {
      font-style: normal;
      color: red !important;
    }
  }
}
</style>
