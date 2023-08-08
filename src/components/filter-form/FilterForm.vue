<template>
  <div class="filter-form">
    <el-form
      :model="formModel"
      :inline="true"
      class="form"
      ref="formRef"
      @validate="onFormValidate"
    >
      <div class="inline-flex mr-2" v-for="column in columns" :key="column.prop">
        <el-form-item :prop="column.prop" :key="column.prop" :rules="column.rules">
          <el-input
            v-model="formModel[column.prop]"
            size="small"
            v-if="column.type == 'input'"
            :placeholder="column?.props?.placeholder ?? '请输入'"
            v-bind="column.props"
          >
            <template #prefix>
              <span>{{ column.label }}</span>
            </template>
          </el-input>

          <el-select
            v-model="formModel[column.prop]"
            size="small"
            v-if="column.type == 'select'"
            v-bind="column.props"
            :placeholder="column?.props?.placeholder ?? '请选择'"
            :no-data-text="column?.props?.noDataText ?? '暂无选项'"
            :loading="columnManager[column.prop].loading"
          >
            <template #prefix>
              <span>{{ column.label }}</span>
            </template>

            <el-option
              v-for="item in columnManager[column.prop].options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-button
          link
          size="small"
          type="primary"
          v-if="columnManager[column.prop]?.error"
          class="refresh-btn"
          >刷新</el-button
        >
      </div>
    </el-form>
    <div class="actions">
      <el-button link @click="onReset" type="primary" size="small">重置</el-button>
      <el-button :type="isValidateValid ? 'primary' : 'info'" @click="onQuery">
        <span class="i-mdi:magnify mr-1" />
        <span>查询</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColumnItem } from './type'
import { FormInstance } from 'element-plus'

interface Props {
  columns: ColumnItem[]
  model: any
}

const props = defineProps<Props>()
const { columns, model } = toRefs(props)

const emit = defineEmits<{
  (event: 'query', condition: any): void
}>()

const formModel = ref(model)

watch(model, (modelValue) => {
  formModel.value = modelValue
})

const formRef = ref<FormInstance | null>(null)

const isValidateValid = ref(true)

function onFormValidate(prop: unknown, isValid: boolean) {
  isValidateValid.value = isValid
}

async function onQuery() {
  try {
    await formRef.value?.validate()
    emit('query', formModel.value)
    // eslint-disable-next-line no-empty
  } catch (error) {
    console.warn(error)
  }
}

function onReset() {
  formRef.value?.resetFields()
}

interface ManagerItem {
  loading: boolean
  error: boolean
  options: any[]
}

const columnManager = ref<Record<string, ManagerItem>>({})

function updateColumnManager(columns: ColumnItem[]) {
  columns.forEach((col) => {
    columnManager.value[col.prop] = { loading: false, error: false, options: [] }

    if (col.type == 'select') {
      loadingOptions(col)
    }
  })
}

function loadingOptions(col: ColumnItem) {
  if (Array.isArray(col.options)) {
    columnManager.value[col.prop].options = col.options
  } else if (typeof col.options === 'function') {
    const resolveOptions = (datas: any[] | false) => {
      if (Array.isArray(datas)) {
        columnManager.value[col.prop].options = datas
      } else {
        columnManager.value[col.prop].error = true
      }

      columnManager.value[col.prop].loading = false
    }
    try {
      columnManager.value[col.prop].loading = true
      col.options(resolveOptions)
    } catch (error) {
      console.error(error)
      columnManager.value[col.prop].loading = false
    }
  }
}

watch(
  columns,
  (newColumns) => {
    updateColumnManager(newColumns)
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.filter-form {
  background-color: #fff;
  display: flex;
  box-shadow: 1px 1px 1px #e1e1e1;
  align-items: center;

  .form {
    flex: 1;
    padding: 12px;
    padding-bottom: 0;
    .el-form-item {
      margin: 0 6px 20px 0;
    }

    ::v-deep(.el-input-group__prepend) {
      padding: 0 5px;
      background-color: #fff;
    }

    ::v-deep(.el-input__prefix) {
      --el-input-icon-color: #666;

      border-right: 1px solid #dcdfe6;
      margin-right: 6px;
    }
  }
  .actions {
    height: 100%;
    padding: 12px;
    border-left: 1px solid #f5f5f5;
  }
}

.refresh-btn {
  padding: 0;
  line-height: 32px;
  height: 32px;
  transform: translateY(-2px);
}
</style>
