<template>
  <el-form-item v-bind="formItemProps">
    <el-input v-model="modelValue" v-bind="componentProps"> </el-input>
  </el-form-item>
</template>

<script setup lang="ts">
import { FORM_INJECT_KEY } from '../form'
import {
  type FilterItemProps,
  useFormItem,
  useFormItemComponent,
  type ELInputProps,
  placeholderTexts
} from './filter-item'

const formContext = inject(FORM_INJECT_KEY)

const props = defineProps<FilterItemProps>()

const { formItemProps } = useFormItem(props)

const { modelValue, componentProps } = useFormItemComponent<ELInputProps>(props, formContext, {
  placeholder: placeholderTexts.Input
})
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
