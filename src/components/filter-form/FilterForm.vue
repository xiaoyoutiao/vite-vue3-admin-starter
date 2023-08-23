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
          <FFInput v-if="column.type == 'input'" :column="column" />
          <FFSelect v-if="column.type == 'select'" :column="column" />
          <FFDatePicker v-if="column.type == 'datePicker'" :column="column" />
          <FFCascader v-if="column.type == 'cascader'" :column="column" />
        </el-form-item>

        <el-button
          link
          size="small"
          type="primary"
          v-if="columnManager[column.prop]?.error"
          class="refresh-btn"
        >
          刷新
        </el-button>
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
import {
  type ColumnItem,
  FLTER_FORM_INJECT_KEY,
  ManagerItem,
  SelectColumn,
  CascaderColumn
} from './form'
import { FormInstance } from 'element-plus'
import FFInput from './items/FFInput.vue'
import FFSelect from './items/FFSelect.vue'
import FFDatePicker from './items/FFDatePicker.vue'
import FFCascader from './items/FFCascader.vue'

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

function setModelValue(key: string, value: unknown) {
  formModel.value[key] = value
}

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

async function onReset() {
  await formRef.value?.resetFields()
  await nextTick()
  await formRef.value?.validate()
  isValidateValid.value = true
}

const columnManager = ref<Record<string, ManagerItem>>({})

function updateColumnManager(columns: ColumnItem[]) {
  columns.forEach((col) => {
    columnManager.value[col.prop] = { loading: false, error: false, options: [] }

    if (col.type == 'select' || col.type == 'cascader') {
      loadingOptions(col)
    }
  })
}

function loadingOptions(col: SelectColumn | CascaderColumn) {
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

provide(FLTER_FORM_INJECT_KEY, { model: formModel, setModelValue, manager: columnManager })
</script>

<style scoped lang="scss">
.filter-form {
  background-color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  .form {
    flex: 1;
    padding: 12px;
    padding-bottom: 0;

    ::v-deep(.el-input__wrapper) {
      height: 26px;
    }

    .el-form-item {
      margin: 0 6px 20px 0;
    }

    ::v-deep(.el-input-group__prepend) {
      padding: 0 5px;
      background-color: #fff;
    }

    ::v-deep(.el-icon.el-input__icon.el-range__icon) {
      width: auto;
      white-space: nowrap;
      color: #666;
      border-right: 1px solid #dcdfe6;
      padding-right: 10px;
    }

    ::v-deep(.el-input__prefix) {
      --el-input-icon-color: #666;
      border-right: 1px solid #dcdfe6;
      margin-right: 6px;
      .el-input__prefix-inner {
        .el-icon.el-input__icon {
          width: auto;
        }
      }
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
