<template>
  <el-input
    :model-value="value"
    :placeholder="placeholder"
    size="small"
    v-bind="restProps"
    @input="onInput"
  >
    <template #prefix>
      <span>{{ column.label }}</span>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import type { InputProps } from 'element-plus'

import { type InputColumn, FLTER_FORM_INJECT_KEY } from '../form'

const formProvider = inject(FLTER_FORM_INJECT_KEY)

interface Props {
  column: InputColumn
}

const props = defineProps<Props>()
const { column } = toRefs(props)
const restProps = column.value.props as Omit<InputProps, 'modelValue'>

const value = computed(() => formProvider?.model.value[column.value.prop])
const placeholder = computed(() => column.value?.props?.placeholder ?? '请输入')

function onInput(value: string) {
  formProvider?.setModelValue(column.value.prop, value)
}
</script>
