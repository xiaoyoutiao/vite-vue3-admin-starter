<template>
  <el-container class="default-layout">
    <el-aside width="70">
      <DefaultSlider />
    </el-aside>

    <el-container>
      <el-header class="default-layout-header" height="56">
        <PageTabs />
        <HeadMenus />
      </el-header>
      <el-main class="default-layout-main">
        <router-view v-slot="{ Component, route }">
          <transition
            mode="out-in"
            name="custom-classes"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <keep-alive :include="viewsStore.cacheComponentsNames" :exclude="excludeNames">
              <component
                :is="Component"
                :key="route.path"
                v-if="route.meta.cacheable !== false && isRenderPage"
              />
            </keep-alive>
          </transition>

          <component
            :is="Component"
            :key="route.path"
            v-if="route.meta.cacheable === false && isRenderPage"
          />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import DefaultSlider from '@/layouts/components/DefaultSlider.vue'
import PageTabs from '@/layouts/components/PageTabs.vue'
import HeadMenus from '@/layouts/components/HeadMenus.vue'
import { LAYOUT_PK } from '@/layouts/helper/provider'

const isRenderPage = ref(true)
const viewsStore = useViewsStore()
const { name } = useRoute()

const excludeNames = ref<string[]>([])

function refreshPage() {
  isRenderPage.value = false
  excludeNames.value.push(String(name).split('-').pop() as string)

  setTimeout(() => {
    isRenderPage.value = true
    excludeNames.value = []
  }, 100)
}

provide(LAYOUT_PK, {
  refreshPage
})
</script>

<style scoped lang="scss">
.default-layout {
  width: 100%;
  min-height: 100vh;
  &-header {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: #252c38;
  }

  &-main {
    background-color: #f0f2f5;
    padding: 10px;
  }
}

/* header {
  width: 100%;
  height: 100px;
  background-color: #3c4043;
} */
</style>

<style scoped>
.animate__animated {
  animation-duration: 0.1s;
}
</style>
