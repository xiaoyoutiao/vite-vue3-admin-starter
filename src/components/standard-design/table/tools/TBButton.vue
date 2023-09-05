<template>
  <el-popconfirm
    v-if="display && p.confirm"
    :title="popconfirmTitle"
    :width="popconfirmWidth"
    :confirm-button-type="p.type"
    hide-icon
    @confirm="onConfirm"
  >
    <template #reference>
      <el-button text :type="p.type" @click="onClick">
        <slot></slot>
      </el-button>
    </template>
  </el-popconfirm>

  <el-button v-else-if="display" text :type="p.type" @click="onClick">
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { InjectkeyWithButtonGroup, type ButtonProps } from './hooks/button'
const { hasPermission } = useAuthStore()

const provider = inject(InjectkeyWithButtonGroup)

const p = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  dropdown: false
})
const e = defineEmits<{
  (e: 'click'): void
  (e: 'confirm'): void
}>()

const canDisplay = computed(
  () =>
    (provider?.buttonContexts.value.length ?? 0) < (provider?.props.max ?? 0) ||
    provider?.canDisplay(getCurrentInstance()?.uid ?? 0)
)

const display = computed(
  () => canDisplay.value && (p.permission ? hasPermission(p.permission) : true)
)
const popconfirmWidth = computed(() => popconfirmTitle.value.length * 16)
const popconfirmTitle = computed(() =>
  typeof p.confirm === 'string' ? p.confirm : '确定执行该操作吗?'
)

const onClick = () => e('click')
const onConfirm = () => e('confirm')

const slots = useSlots()
if (provider && getCurrentInstance()?.uid) {
  provider.setButton({
    uid: getCurrentInstance()?.uid as number,
    props: p,
    slots,
    hasPermission,
    onClick,
    onConfirm
  })
}
</script>

<style scoped lang="scss">
.el-button {
  padding-left: 8px;
  padding-right: 8px;
  margin: 0;
}
</style>
