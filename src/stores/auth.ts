import { useSetState } from '@/composables/useSetState'

export const useAuthStore = defineStore('Auth', () => {
  const [permissions, setPermissions] = useSetState<string[]>([])

  const hasPermission = (code: string) => {
    return permissions.value.some((c) => c === code)
  }

  return {
    permissions,
    setPermissions,
    hasPermission
  }
})
