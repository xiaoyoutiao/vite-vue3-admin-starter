<template>
  <el-table-column v-bind="props" :align="align">
    <template #header="scope" v-if="slots.header || headerTooltip">
      <slot v-bind="scope" name="header">
        <TabelColumnTooltip v-if="headerTooltip" :column="props" :tooltip="headerTooltip" />
      </slot>
    </template>

    <template #default="scope">
      <slot v-bind="scope" :value="scope.row[scope?.column?.property]" name="default">
        <span class="text-20px" v-if="props.renderType == 'whether'">
          <i
            class="i-mdi:checkbox-multiple-marked-circle color-blue-600"
            v-if="isTruthy(scope.row[scope.column.property])"
          />
          <i class="i-mdi:close-thick text-gray-400" v-else />
        </span>

        <span v-else>
          {{ accessContent(scope.row[scope.column.property]) }}
        </span>
      </slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { type ElTableColumnProps } from './types'
import TabelColumnTooltip from './TabelColumnTooltip.vue'

const isTruthy = (val: unknown) => {
  return typeof val == 'boolean' || typeof val == 'number'
    ? !!val
    : typeof val == 'string'
    ? !!Number(val)
    : Boolean(val)
}

interface ArrayEnumItem {
  label: string
  value: unknown
}

interface ObjectEnum {
  [index: string]: string
}

interface Props extends ElTableColumnProps {
  headerTooltip?: string
  renderData?: ArrayEnumItem[] | ObjectEnum | string[]
  renderType?: 'enum' | 'whether'
}

const props = withDefaults(defineProps<Props>(), {})

const slots = useSlots()

const rowValue = ref()

const accessEnumText = (enums: ArrayEnumItem[] | string[] | ObjectEnum, value: unknown) =>
  (enums as ArrayEnumItem[])?.find((e) => e?.value == value)?.label ?? enums[value as number]

const accessContent = (value: string) => {
  rowValue.value = value
  const { renderType, renderData } = props

  if (renderType == 'enum' && renderData) {
    return accessEnumText(renderData, value) ?? value ?? '--'
  }

  return value ?? '--'
}

const align = computed(() => {
  if (props.align) return props.align
  if (typeof rowValue.value == 'number') {
    return 'right'
  }
  return 'left'
})
</script>

<style scoped></style>
