<template>
  <slot :row="row" :value="row[props.valueKey]" :label="row[props.labelKey]">
    <div>{{ row[props.labelKey] ?? props.defaultLabel ?? '--' }}</div>
  </slot>
</template>

<script setup lang="ts">
interface OptionItem<V = any> {
  value?: V
  label?: string
  [key: string]: any
}

interface Props {
  value: unknown
  options: OptionItem[]
  valueKey?: string
  labelKey?: string
  defaultLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  valueKey: 'value',
  labelKey: 'label'
})

const row = computed(() => props.options.find((item) => item[props.valueKey] == props.value) ?? {})
</script>

<style lang="scss" scoped></style>
