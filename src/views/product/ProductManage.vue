<route lang="json">
{
  "meta": {}
}
</route>

<template>
  <div class="h-100%">
    <vxe-table border :data="tableData" class="h-100%" height="100%">
      <vxe-column type="seq" width="60" fixed="left"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="sex" title="Sex" width="180px"></vxe-column>
      <vxe-column field="age" title="Age" show-overflow fixed="right" width="200px"></vxe-column>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
import { VxeGridProps } from 'vxe-table'

interface UserVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const tableData = ref<UserVO[]>([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
])

const gridOptions = reactive<VxeGridProps<UserVO>>({
  border: true,
  columns: [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'Name', slots: { default: 'name' } },
    { field: 'sex', title: 'Sex', showHeaderOverflow: true },
    { field: 'address', title: 'Address', showOverflow: true }
  ],
  formConfig: {},
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ]
})
</script>

<style scoped></style>
