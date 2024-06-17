import Axios from 'axios'
import type { RouteRecordNormalized } from 'vue-router'
import type { MenuModule, MenuItem } from '@/router/helpers'

export const useUserStore = defineStore(
  'user',
  () => {
    const { replace, getRoutes, removeRoute } = useRouter()
    const viewsStore = useViewsStore()

    const isLogin = ref(false)

    function logout() {
      isLogin.value = false
      replace({ path: '/login/UserLogin' })
    }

    async function fetchRoutes() {
      const res = await Axios.get('/server/api/system/menu/tree')
      const remoteMenus = res.data.data

      viewsStore.setMenus(remoteMenus ?? [])

      const localRoutes = getRoutes()
      patchRoutes(remoteMenus, localRoutes)
    }

    function patchRoutes(menuModule: MenuModule[], routes: RouteRecordNormalized[]) {
      const menuItems = menuModule.reduce((acc, mod) => {
        const items: MenuItem[] = []

        mod.children?.map((group) => {
          items.push(...(group.children || []))
        })
        acc.push(...items)
        return acc
      }, [] as MenuItem[])

      routes.forEach((route) => {
        const targetMenu = menuItems.find((item) => item.path === route.path)

        if (targetMenu) {
          route.meta.alias = targetMenu.name
        }

        if (!targetMenu && route.meta.static !== true && route.name) {
          removeRoute(route.name)
        }
      })
    }

    return {
      isLogin,
      logout,
      fetchRoutes
    }
  },
  {
    persist: {
      paths: ['isLogin']
    }
  }
)
