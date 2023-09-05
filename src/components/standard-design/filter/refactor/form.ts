export { type ElForm } from 'element-plus'

export interface FormContext {
  model: any
}

export const FORM_INJECT_KEY = Symbol('form') as InjectionKey<FormContext>
