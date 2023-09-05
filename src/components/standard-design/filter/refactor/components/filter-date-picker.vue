<template>
  <el-form-item v-bind="formItemProps">
    <el-date-picker v-model="modelValue" v-bind="componentProps" />
    <!-- 
    start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="/"
      :placeholder="placeholderTexts.DatePicker" -->
  </el-form-item>
</template>

<script setup lang="ts">
import { FORM_INJECT_KEY } from '../form'
import {
  type ComponentDatePickerProps,
  useFormItem,
  useFormItemComponent,
  type ELDatePickerProps,
  placeholderTexts
} from './filter-item'

const formContext = inject(FORM_INJECT_KEY)

const props = defineProps<ComponentDatePickerProps>()

const { formItemProps } = useFormItem(props)
const { modelValue, componentProps } = useFormItemComponent<ELDatePickerProps>(props, formContext, {
  placeholder: placeholderTexts.DatePicker,
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期'
})
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
