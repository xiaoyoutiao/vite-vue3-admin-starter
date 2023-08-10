import type {
  FormItemRule,
  InputProps,
  ISelectProps,
  DatePickerProps,
  cascaderProps,
  CascaderOption
} from 'element-plus'
import type { Ref, ExtractPropTypes } from 'vue'

export interface ManagerItem {
  loading: boolean
  error: boolean
  options: any[]
}

interface FilterFormProvider<T = any> {
  model: Ref<T>
  setModelValue: (key: string, value: unknown) => void
  manager: Ref<Record<string, ManagerItem>>
}

export const FLTER_FORM_INJECT_KEY = Symbol() as InjectionKey<FilterFormProvider>

export type ColumnComponentType = 'input' | 'select' | 'datePicker' | 'dateRange'

export interface SharedColumnItem {
  label?: string
  prop: string
  rules?: FormItemRule[]
}

export interface SelectColumn extends SharedColumnItem {
  type: 'select'
  options: any[] | ((resolver: (datas: any[] | false) => any) => any)
  props?: Readonly<ExtractPropTypes<ISelectProps>>
}

export interface InputColumn extends SharedColumnItem {
  type: 'input'
  props?: Readonly<ExtractPropTypes<InputProps>>
}

export interface DatePickerColumn extends SharedColumnItem {
  type: 'datePicker'
  props?: Readonly<ExtractPropTypes<DatePickerProps>>
}

export interface CascaderColumn extends SharedColumnItem {
  type: 'cascader'
  props?: Readonly<ExtractPropTypes<ExtractPropTypes<typeof cascaderProps>>>
  options?: CascaderOption[] | ((resolver: (datas: CascaderOption[] | false) => any) => any)
}

export type ColumnItem = SelectColumn | InputColumn | DatePickerColumn | CascaderColumn
