<template>
  <el-menu
    class="default-slider"
    collapse
    menu-trigger="click"
    unique-opened
    router
    :default-active="activePath"
  >
    <div class="logo">Logo</div>
    <el-sub-menu
      v-for="menuModule in viewsStore.menus"
      :style="getSubMenuStyle(menuModule)"
      :index="menuModule.name"
      :key="menuModule.name"
      teleported
      :popper-class="cssModule['default-slider-popper']"
      :popper-offset="0"
    >
      <template #title>
        <div class="menu-title" :class="{ 'menu-title--active': isActivedMenuModule(menuModule) }">
          <span class="text-20px" :class="[menuModule.iconName]"></span>
          <span class="leading-18px text-12px">{{ menuModule.name }}</span>
        </div>
      </template>

      <el-menu-item-group
        :index="menuModule.name"
        v-for="menuGroup in menuModule.children"
        :key="menuGroup.name"
      >
        <template #title>
          <div class="mt-4">{{ menuGroup.name }}</div>
        </template>
        <el-menu-item
          :index="menuItem.path"
          v-for="menuItem in menuGroup.children"
          :key="menuItem.name"
        >
          {{ menuItem.name }}
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuModule } from '@/router/helpers'

const cssModule = useCssModule()
const { currentRoute } = useRouter()
const viewsStore = useViewsStore()

const activePath = ref('')

watchEffect(() => {
  activePath.value = currentRoute.value.path
})

function isActivedMenuModule(menuModule: MenuModule) {
  return menuModule.children?.some(
    (menuGroup) => menuGroup.children?.some((menuItem) => menuItem.path == activePath.value)
  )
}

function getSubMenuStyle(menuModule: MenuModule) {
  const isActivied = isActivedMenuModule(menuModule)
  return {
    background: isActivied ? '#43464c' : ''
  }
}
</script>

<style module lang="scss">
.default-slider-popper {
  --el-box-shadow-light: none;
  --el-menu-active-color: #075299;
  height: 100vh;
  max-height: 100vh;
  box-sizing: border-box;
  border: none;
  margin-top: -2px;
  // box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15);

  & > ul {
    width: auto;
    height: 100vh;
    max-height: 100vh;
    overflow-y: hidden;
    writing-mode: vertical-lr;

    & > li {
      display: inline-flex;
      writing-mode: horizontal-tb;
      width: 200px;
      flex-direction: column;
    }
  }
}
</style>

<style scoped lang="scss">
.el-menu {
  border: none;
  --el-menu-base-level-padding: 0;
  --el-menu-item-height: 50px;
  --el-menu-bg-color: #14181f;
  --el-menu-hover-bg-color: rgba(255, 255, 255, 0.2);
  --el-menu-text-color: rgba(255, 255, 255, 0.6);

  .el-menu-item {
    line-height: 35px;
    height: 35px;
    &.is-active {
      background-color: #e5eefe;
    }
  }
}

.default-slider {
  height: 100%;
}

.menu-title {
  width: 70px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;

  &--active {
    color: #fff;
  }
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
}
</style>
