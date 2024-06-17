<template>
  <div class="flex justify-end mt-2" :class="wrapperClass">
    <el-pagination
      v-model:current-page="paging.currentPage"
      v-model:page-size="paging.pageSize"
      :total="paging.total"
      :page-sizes="[10, 20, 50, 100, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :small="small"
      :background="background"
      @size-change="onChange"
      @current-change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { Paging } from '@/composables/useTable'

interface Props {
  modelValue: Paging
  small?: boolean
  wrapperClass?: string
  background?: boolean
}

const props = defineProps<Props>()
const { modelValue: paging, small, background } = toRefs(props)
const emit = defineEmits<{
  (e: 'change', p: Paging): void
}>()

function onChange() {
  emit('change', paging.value)
}
</script>

<style scoped></style>
