<template>
  <div class="ff-cascader" :class="{ 'is-foces': focused }">
    <span class="ff-cascader--prefix">{{ column.label }}</span>
    <el-cascader
      :model-value="value"
      size="small"
      :placeholder="loading ? '加载数据中' : placeholder"
      :options="options"
      v-bind="restProps"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script setup lang="ts">
import type { ExtractPropTypes } from 'vue'
import type { cascaderProps } from 'element-plus'

import { CascaderColumn, FLTER_FORM_INJECT_KEY } from '../form'

const Texts = {
  placeholder: '请选择',
  noDateText: '暂无数据项'
} as const

interface Props {
  column: CascaderColumn
}

const formProvider = inject(FLTER_FORM_INJECT_KEY)
const props = defineProps<Props>()
const { column } = toRefs(props)
const restProps = column.value.props as unknown as Omit<
  ExtractPropTypes<typeof cascaderProps>,
  'options'
>

const value = computed(() => formProvider?.model.value[column.value.prop])
const placeholder = computed(() => column?.value?.props?.placeholder ?? Texts.placeholder)
const loading = computed(() => formProvider?.manager.value[column.value.prop].loading ?? false)
const options = computed(() => formProvider?.manager.value[column.value.prop].options ?? [])

function onChange(value: unknown) {
  formProvider?.setModelValue(column.value.prop, value)
}

const focused = ref(false)
function onFocus() {
  focused.value = true
}
function onBlur() {
  focused.value = false
}
</script>

<style scoped lang="scss">
.ff-cascader {
  display: flex;
  align-items: center;
  height: 26px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #dcdfe6;
  &.is-foces {
    box-shadow: 0 0 0 1px #0655dd !important;
  }

  ::v-deep(.el-input__wrapper) {
    // transform: translateY(-2px);
    box-shadow: 0 0 0 1px transparent !important;
  }

  &--prefix {
    padding: 0 8px;
    color: #666;
    border-right: 1px solid #dcdfe6;
  }
}
</style>
