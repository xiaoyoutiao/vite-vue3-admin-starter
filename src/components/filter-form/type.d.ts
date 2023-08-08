import { FormItemRule } from 'element-plus'

type ColumnComponentType = 'input' | 'select' | 'datePicker' | 'dateRange'

export interface ColumnItem {
  type?: ColumnComponentType
  label?: string
  prop: string
  props?: any
  options?: any[] | ((resolver: (datas: any[] | false) => any) => any)
  rules?: FormItemRule[]
}
