<template>
  <ContextMenu
    :position="contextMenuPosition"
    v-model:visible="contextMenuVisible"
    @click-menu-item="handleClickMenuItem"
  />

  <el-tabs
    type="card"
    class="demo-tabs"
    tab-position="bottom"
    :modelValue="currentPagePath"
    @tab-click="handleTabChange"
    @tab-remove="handleTabRemove"
  >
    <el-tab-pane
      v-for="item in viewsStore.cachePages"
      :key="item.path"
      :name="item.path"
      :closable="isClosable(item)"
    >
      <template #label>
        <div class="tab-label" @contextmenu="(e) => handleContextmenu(e, item)">
          {{ item.alias || item.name || item.path }}
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { TabsPaneContext } from 'element-plus'
import { CachePage, useViewsStore } from '@/stores/views'
import ContextMenu from './ContextMenu.vue'
import { ButtonEnum } from './context-menu.d'
import { LAYOUT_PK } from '../helper/provider'

const viewsStore = useViewsStore()
const { currentRoute, push, replace } = useRouter()
const currentPagePath = ref('')

const layoutProvider = inject(LAYOUT_PK)

watch(
  currentRoute,
  (route) => {
    const { fullPath, path, name, meta = {} } = route
    currentPagePath.value = route.path

    const page: CachePage = {
      fullPath,
      path,
      name: name as string,
      alias: (meta.alias ?? '') as string
    }

    if (!viewsStore.isExistCachePage(page)) {
      viewsStore.setCachePage(page)
    }
  },
  { immediate: true }
)

function handleTabChange(pane: TabsPaneContext) {
  if (pane.paneName === currentRoute.value.path) return
  push({ path: String(pane.paneName) })
}

function handleTabRemove(path: string | number) {
  viewsStore.removeCachePage(viewsStore.findCachePageByPath(String(path)))
}

const isClosable = (page: CachePage) => !(viewsStore.cachePages.length === 1 && page.path === '/')

const contextMenuVisible = ref(false)
const contextMenuPosition = reactive({ x: 0, y: 0 })
let contextMenuTargetPage: CachePage | null = null

function handleContextmenu(event: MouseEvent, page: CachePage) {
  event.preventDefault()
  contextMenuTargetPage = page
  contextMenuPosition.x = event.clientX
  contextMenuPosition.y = event.clientY
  contextMenuVisible.value = true
}

function handleClickMenuItem(name: ButtonEnum) {
  contextMenuVisible.value = false
  if (!contextMenuTargetPage) return

  switch (name) {
    case ButtonEnum.Refresh:
      refreshTab(contextMenuTargetPage)
      break
    case ButtonEnum.CloseCurrent:
      viewsStore.removeCachePageByPath(contextMenuTargetPage.path)
      break
    case ButtonEnum.CloseOther:
      closeOtherTab(contextMenuTargetPage)
      break
    default:
      break
  }
}

function refreshTab(page: CachePage) {
  if (currentRoute.value.fullPath !== page.fullPath) {
    replace({ path: page.fullPath })
  }
  layoutProvider?.refreshPage()
}

function closeOtherTab(page: CachePage) {
  const target = viewsStore.findCachePageByPath(page.path)
  if (target) {
    viewsStore.clearOtherCachePage([target])

    if (currentRoute.value.path !== target.path) {
      replace({ path: target.fullPath })
    }
  }
}
</script>

<style scoped lang="scss">
.demo-tabs {
  margin: 0 8px;
}
.tab-label {
  min-width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
}

.el-tabs {
  --el-bg-color: #043f75;
  --el-color-primary: #075299;
  --el-tabs-header-height: 36px;
}
</style>
