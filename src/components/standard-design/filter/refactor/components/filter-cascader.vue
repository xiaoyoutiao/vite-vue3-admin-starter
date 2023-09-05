<template>
  <el-form-item v-bind="extFormItemProps">
    <el-cascader v-model="modelValue" v-bind="componentProps"></el-cascader>
  </el-form-item>
</template>

<script setup lang="ts">
import { cascaderProps, formItemProps } from 'element-plus'
import { FORM_INJECT_KEY } from '../form'
import { useFormItem, useFormItemComponent, type FilterItemProps } from './filter-item'
import type { ExtractPropTypes } from 'vue'

const formContext = inject(FORM_INJECT_KEY)

const props = defineProps({ ...cascaderProps, ...formItemProps })

const { formItemProps: extFormItemProps } = useFormItem(props as FilterItemProps)
const { modelValue, componentProps } = useFormItemComponent<ExtractPropTypes<typeof cascaderProps>>(
  props as FilterItemProps,
  formContext
)
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
