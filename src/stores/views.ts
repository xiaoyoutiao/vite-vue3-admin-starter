export interface CachePage {
  path: string
  fullPath: string
  name: string
  alias?: string
  componentName?: string
}

export const useViewsStore = defineStore(
  'views',
  () => {
    const { push } = useRouter()

    const cachePages = ref<CachePage[]>([])
    const setCachePage = (page: CachePage) => cachePages.value.push(page)
    const isExistCachePage = (page: CachePage) =>
      cachePages.value.some((cache) => cache.path === page.path)
    const findCachePageByPath = (path: string) =>
      cachePages.value.find((cache) => cache.path === path)
    const removeCachePage = (page?: CachePage) => {
      if (!page) return
      const index = cachePages.value.findIndex((cache) => cache.path === page.path)

      if (index > -1) {
        cachePages.value.splice(index, 1)
        const nextPage = cachePages.value[index] ?? cachePages.value[cachePages.value.length - 1]
        nextPage ? push({ path: String(nextPage.fullPath) }) : push({ path: '/' })
      }
    }

    const removeCachePageByPath = (path: string) => {
      const page = findCachePageByPath(path)
      page && removeCachePage(page)
    }
    const clearOtherCachePage = (pages: CachePage[]) => {
      cachePages.value.forEach((page) => {
        if (!pages.includes(page)) {
          removeCachePage(page)
        }
      })
    }

    const isRenderPage = ref(true)

    const cacheComponentsNames = computed(() =>
      cachePages.value.map((r) => r.name.split('-').pop() as string)
    )

    return {
      cachePages,
      isExistCachePage,
      findCachePageByPath,
      setCachePage,
      removeCachePage,
      removeCachePageByPath,
      clearOtherCachePage,
      isRenderPage,
      cacheComponentsNames
    }
  },
  {
    persist: {
      // paths: []
    }
  }
)
