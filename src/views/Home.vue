<route lang="json">
{
  "path": "/",
  "meta": {
    "alias": "首页",
    "cacheable": true
  }
}
</route>

<template>
  <main>
    <FilterForm :model="condition" :columns="columns" @query="onQuery"></FilterForm>
    <div class="my-5">{{ condition }}</div>
  </main>
</template>

<script setup lang="ts">
import FilterForm from '@/components/filter-form/FilterForm.vue'
import { ColumnItem } from '@/components/filter-form/type'

const condition = reactive({
  keyword: '',
  status: '',
  name: ''
})

const columns: ColumnItem[] = [
  {
    type: 'input',
    label: '关键词',
    prop: 'keyword',
    rules: [{ message: '关键词必须', required: true }]
  },
  {
    type: 'select',
    label: '状态',
    prop: 'status',
    options: (resolve) => {
      setTimeout(() => {
        resolve([
          { label: '开启', value: 1 },
          { label: '关闭', value: 0 }
        ])
      }, 3000)
    },
    props: {
      clearable: true
    }
  }
]
function onQuery(cond: unknown) {
  console.log('cond :>> ', cond)
}
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100px;
  background-color: #000;
  .item {
    width: 100px;
    height: 100px;
    background-color: #fff;
  }
}
</style>
