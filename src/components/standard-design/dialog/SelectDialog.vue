<template>
  <el-dialog
    class="select-dialog"
    v-model="dialogVisible"
    :title="title"
    width="60%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @opened="onDialogOpened"
  >
    <el-row>
      <el-col v-if="slots.header" class="area" :span="24">
        <slot name="header"> </slot>
      </el-col>
      <el-col class="area" :span="16">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          class="w-full"
          height="450"
          :data="data"
          :row-key="rowKey"
          handleRemove
          border
          @selection-change="handleSelectionChange"
          @select-all="handleSelectAll"
        >
          <el-table-column
            fixed
            type="selection"
            width="35"
            align="center"
            reserve-selection
            :selectable="canSelectable"
          />
          <slot name="columns"></slot>
        </el-table>
      </el-col>

      <el-col class="area main" :span="8">
        <div class="selected">
          <div class="selected__header">
            <span
              >已选 ({{ multipleSelection.length }}<span v-if="isLimit">/{{ max }}</span
              >)</span
            >
            <el-popconfirm
              title="确定清空吗?"
              confirm-button-type="danger"
              confirm-button-text="清空"
              @confirm="clearAll"
            >
              <template #reference>
                <el-button link type="danger" :disabled="!enabledClear">清空</el-button>
              </template>
            </el-popconfirm>
          </div>
          <span class="selected__empty" v-if="!multipleSelection.length">暂无数据</span>
          <div class="selected-options">
            <span
              class="selected-option"
              v-for="option in multipleSelection"
              :key="option?.[rowKey]"
            >
              <slot name="selected-option" :option="option"> {{ option[labelKey] }}</slot>
              <span class="selected-option__close" @click="handleRemove(option)">
                <i class="i-mdi:close" />
              </span>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>

    <template #footer>
      <el-row class="overflow-auto">
        <el-col>
          <slot name="footer"></slot>
        </el-col>

        <el-col class="mt-2">
          <el-button @click="dialogVisible = false" class="ml-auto">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElTable } from 'element-plus'

const dialogVisible = ref(true)
const handleClose = () => (dialogVisible.value = false)

interface SelectDialogProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
  rowKey: string
  labelKey: string
  title?: string
  max?: number
  loading?: boolean
}
const slots = defineSlots()
const props = withDefaults(defineProps<SelectDialogProps>(), {
  title: '选择',
  max: -1
})
const { modelValue, data, rowKey, max, loading } = toRefs(props)

const multipleTable = ref<InstanceType<typeof ElTable> | null>(null)
const multipleSelection = ref<any[]>([])

const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val
}

const handleSelectAll = async (selection: any[]) => {
  if (isLimit.value) {
    const newSelection = selection.slice(0, max.value)
    setTable(newSelection)
  }
}

const handleRemove = (option: any) => {
  multipleSelection.value = multipleSelection.value.filter(
    (i) => i[rowKey.value] !== option[rowKey.value]
  )
  multipleTable.value?.toggleRowSelection(option, false)
}

const enabledClear = computed(() => !!multipleSelection.value.length)
const clearAll = () => {
  multipleSelection.value = []
  multipleTable.value?.clearSelection()
}

const hasSelected = (row: any) => {
  return multipleSelection.value.some((i) => i[rowKey.value] === row[rowKey.value])
}
const isLimit = computed(() => max.value > 0)

const canSelectable = (row: any) => {
  return hasSelected(row) || (isLimit.value ? multipleSelection.value.length < max.value : true)
}

const getOriginData = (source: any) =>
  data.value.find((i) => i[rowKey.value] === source[rowKey.value])

const setTable = async (list: any[]) => {
  multipleTable.value?.clearSelection()
  await nextTick()
  list.forEach((row) => {
    const target = getOriginData(row)
    multipleTable.value?.toggleRowSelection(target, true)
  })
}

const onDialogOpened = async () => {
  setTable(modelValue.value)
}
</script>

<style scoped lang="scss">
.area {
  border-radius: var(--el-border-radius-base);
}

.selected {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin: 0 0 0 16px;
  border: 1px solid #ebeef5;
  border-radius: var(--el-border-radius-base);
  position: relative;

  &__header {
    z-index: 1;
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    height: 40px;
    font-size: 12px;
    background-color: #f9f9f9;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
    justify-content: space-between;

    button {
      font-size: 12px;
    }
  }

  &-options {
    display: flex;
    flex-direction: column;
    padding: 5px 8px;
  }

  &__empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    color: #999;
    font-size: 12px;
    padding: 10px;
  }

  &-option {
    background-color: #f9f9f9;
    margin: 4px 0;
    padding: 4px;
    border: 1px solid transparent;
    transition: all 0.2s linear;
    border-radius: 2px;
    vertical-align: middle;
    position: relative;
    padding-right: 30px;
    font-size: 12px;

    &:hover {
      background-color: #f5f7fa;
      .selected-option__close {
        opacity: 1;
      }
    }

    &__close {
      opacity: 0;
      width: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      right: 0;
      color: var(--el-color-info);
      font-size: 16px;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 0.1s linear;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
.dialog-header {
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 15px;
  padding-right: 30px;
}

.main {
  height: 450px;
  overflow-y: auto;
}
</style>
