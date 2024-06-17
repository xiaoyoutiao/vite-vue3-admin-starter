<template>
  <span class="text-20px">
    <i v-if="isTruthy" :class="['color-blue-600', `i-mdi:${props.truthyIcon}`]" />
    <i :class="['text-gray-400', `i-mdi:${props.falsyIcon}`]" v-else />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: unknown
    truthyIcon: string
    falsyIcon?: string
  }>(),
  {
    truthyIcon: 'checkbox-multiple-marked',
    falsyIcon: 'close-box-multiple-outline'
  }
)

const isTruthy = computed(() => {
  const { value } = props
  return typeof value == 'boolean' || typeof value == 'number'
    ? !!value
    : typeof value == 'string'
    ? !!Number(value)
    : Boolean(value)
})
</script>

<style scoped></style>
