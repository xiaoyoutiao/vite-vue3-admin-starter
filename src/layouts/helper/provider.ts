import type { InjectionKey } from 'vue'

export const LAYOUT_PK = Symbol('Layout') as InjectionKey<LayoutProvider>

export interface LayoutProvider {
  refreshPage: () => void
}
