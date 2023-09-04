import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  NProgress.inc()

  const userStore = useUserStore()

  if (!userStore.isLogin && to.meta.logined !== false) {
    userStore.logout()
    return false
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
