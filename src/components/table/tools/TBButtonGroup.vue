<template>
  <div>
    <slot></slot>
    <!-- @command="handleCommand" -->
    <el-dropdown trigger="click" v-if="dropdownButtonContexts.length" @command="onDisptchCommand">
      <el-button text type="primary">
        更多
        <i class="i-mdi:unfold-more-horizontal" />
      </el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="ctx" v-for="ctx in dropdownButtonContexts" :key="ctx.uid">
            <el-text :type="getType(ctx)">
              <Render :ctx="ctx" />
            </el-text>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'

import {
  InjectkeyWithButtonGroup,
  useButtonGroup,
  type ButtonGroupProps,
  type ButtonContext
} from './hooks/button'
import Render from './hooks/Render'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  max: 2
})

const buttonGroup = useButtonGroup(props)
const { dropdownButtonContexts } = buttonGroup
provide(InjectkeyWithButtonGroup, { name: 'ButtonGroup', ...buttonGroup })

function getType(ctx: ButtonContext) {
  return ctx.props.type as 'primary'
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { appContext } = getCurrentInstance()!

function onDisptchCommand(ctx: ButtonContext) {
  const { props, onClick, onConfirm } = ctx
  const { confirm, type } = props

  const TypeMap = {
    danger: 'error',
    success: 'success',
    warning: 'warning',
    info: 'info'
  }
  if (confirm) {
    ElMessageBox(
      {
        type: TypeMap[type as string] ?? 'warning',
        title: '操作确认',
        message: typeof confirm == 'string' ? confirm : '确定执行此操作吗?',
        boxType: 'confirm',
        showCancelButton: true
      },
      appContext
    )
      .then(() => onConfirm())
      .catch(() => console.log('取消操作'))
  } else {
    onClick()
  }
}
</script>

<style scoped lang="scss">
.el-button {
  padding-left: 8px;
  padding-right: 8px;
  margin: 0;
}
</style>
