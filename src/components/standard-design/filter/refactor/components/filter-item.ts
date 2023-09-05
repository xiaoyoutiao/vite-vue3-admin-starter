import {
  type FormItemProps,
  type InputProps,
  type DatePickerProps,
  type SelectV2Context,
  cascaderProps
} from 'element-plus'

import { pick, omit, defaults } from 'lodash-es'
import { type FormContext } from '../form'
import type { ExtractPropTypes } from 'vue'

export type ELInputProps = Partial<InputProps>
export type ELSelectProps = ExtractPropTypes<SelectV2Context['props']>
export type ELDatePickerProps = Partial<DatePickerProps>
export type ELCascaderProps = Partial<typeof cascaderProps>

export type ComponentInputProps = ELInputProps & FilterItemProps
export type ComponentSelectProps = ELSelectProps & FilterItemProps
export type ComponentDatePickerProps = ELDatePickerProps & FilterItemProps
export type ComponentCascaderProps = ELCascaderProps & FilterItemProps

export type FilterItemProps = {
  prop: string
  label: string
} & Partial<FormItemProps>

export const placeholderTexts = {
  Input: '请输入',
  Select: '请选择',
  DatePicker: '请选择日期',
  Cascader: '请选择'
} as const

const formItemPropsKeys = [
  'label',
  'prop',
  'error',
  'for',
  'inlineMessage',
  'labelWidth',
  'required',
  'rules',
  'showMessage',
  'size',
  'validateStatus',
  'modelValue'
]

export function useFormItem(props: FilterItemProps /* , formContext: FormContext */) {
  const pickedProps = pick(props, ...formItemPropsKeys)
  const formItemProps: Partial<FormItemProps> = pickedProps

  return {
    formItemProps
  }
}

export function useFormItemComponent<T extends Record<string, unknown>>(
  props: FilterItemProps,
  formContext?: FormContext,
  defaultProps?: T
) {
  defaultProps = defaultProps ?? ({} as T)
  const omitedProps = omit(props, [...formItemPropsKeys])
  const componentProps = defaults(omitedProps, defaultProps)

  const { model } = formContext ?? {}

  const modelValue = computed({
    get() {
      return model[props.prop]
    },
    set(v: unknown) {
      model[props.prop] = v
    }
  })

  return {
    componentProps,
    modelValue
  }
}
