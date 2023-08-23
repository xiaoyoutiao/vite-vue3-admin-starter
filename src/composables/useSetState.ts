import { type UnwrapRef, type ComputedRef } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFunction(val: unknown): val is (...args: any[]) => any {
  return typeof val === 'function'
}

type Setter<T> = (setter: T | ((preValue: UnwrapRef<T>) => T)) => void

export function useSetState<T>(initialValue: T): [ComputedRef<T>, Setter<T>] {
  const unrefValue = isRef<T>(initialValue) ? initialValue.value : initialValue
  const _value = ref<T>(unrefValue)
  const state = computed(() => _value.value as T)

  function setState(setter: T | ((preValue: UnwrapRef<T>) => T)) {
    if (isFunction(setter)) {
      _value.value = setter(_value.value) as UnwrapRef<T>
    } else {
      _value.value = setter as UnwrapRef<T>
    }
  }

  return [state, setState]
}
