<template>
  <ul
    ref="contextMenuRef"
    class="context-menu"
    v-if="props.visible"
    :style="{ left: props.position.x + 'px', top: props.position.y + 'px' }"
  >
    <li v-for="menu in menus" :key="menu.name" @click="handleClickItem(menu)">{{ menu.text }}</li>
  </ul>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

import { ButtonEnum, MenuItem } from './context-menu.d'

interface Props {
  position: { x: number; y: number }
  visible: boolean
}

interface Emit {
  (event: 'update:visible', value: boolean): void
  (event: 'click-menu-item', name: ButtonEnum): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const menus: MenuItem[] = [
  { name: ButtonEnum.Refresh, text: '刷新当前页面' },
  { name: ButtonEnum.CloseCurrent, text: '关闭当前页面' },
  { name: ButtonEnum.CloseOther, text: '关闭其他页面' }
]

const contextMenuRef = ref(null)

onClickOutside(contextMenuRef, () => {
  if (props.visible) {
    emit('update:visible', false)
  }
})

function handleClickItem(menu: MenuItem) {
  emit('click-menu-item', menu.name)
}
</script>

<style scoped lang="scss">
.context-menu {
  position: absolute;
  background-color: #fff;
  z-index: 100;
  list-style: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  padding: 10px 0;

  li {
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>
