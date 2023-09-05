<template>
  <el-form-item v-bind="formItemProps">
    <el-select v-model="modelValue" v-bind="componentProps"></el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { FORM_INJECT_KEY } from '../form'
import {
  type ComponentSelectProps,
  useFormItem,
  useFormItemComponent,
  placeholderTexts,
  type ELSelectProps
} from './filter-item'

const formContext = inject(FORM_INJECT_KEY)

const props = defineProps<ComponentSelectProps>()

const { formItemProps } = useFormItem(props)
const { modelValue, componentProps } = useFormItemComponent<ELSelectProps>(props, formContext, {
  placeholder: placeholderTexts.Select
})
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
