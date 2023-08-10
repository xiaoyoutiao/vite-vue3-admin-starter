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
    <!-- <div class="my-5">{{ condition }}</div> -->

    <vxe-table max-height="90%" :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column
        field="name"
        title="名称"
        :title-prefix="{ content: '名称是假的, 看下就行, 不用太过认真' }"
      ></vxe-column>
      <vxe-column field="sex" title="性别" align="center"></vxe-column>
      <vxe-column field="age" title="年龄"></vxe-column>
      <vxe-column field="address" title="收货地址" show-overflow></vxe-column>
    </vxe-table>
  </main>
</template>

<script setup lang="ts">
import FilterForm from '@/components/filter-form/FilterForm.vue'
import { ColumnItem } from '@/components/filter-form/form'

const condition = reactive({
  keyword: '',
  status: '',
  name: '',
  beginTime: ['2023-08-18T16:00:00.000Z'],
  streeCodes: ['f1', 'f1-c1']
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
      }, 1000)
    },
    props: {
      clearable: true
    }
  },
  {
    type: 'datePicker',
    label: '时间范围',
    prop: 'beginTime',
    props: {
      type: 'daterange'
    }
  },
  {
    type: 'cascader',
    label: '街道',
    prop: 'streeCodes',
    options: (resolver) => {
      setTimeout(() => {
        const list: any[] = []
        for (let i = 0; i < 100; i++) {
          list[i] = { label: 'f' + 0, value: 'f' + i, children: [] }

          for (let j = 0; j < 10; j++) {
            list[i].children[j] = {
              label: 'f' + i + 'c' + j,
              value: 'f' + i + 'c' + j,
              children: []
            }
            for (let z = 0; z < 3; z++) {
              list[i].children[j].children[z] = {
                label: 'f' + i + 'c' + j,
                value: 'f' + i + 'c' + j
              }
            }
          }
        }

        resolver(list)
      }, 1500)
    },
    props: {
      clearable: true
    }
  }
]
function onQuery(cond: unknown) {
  console.log('cond :>> ', cond)
}

const tableData = ref<any>([])

const list = []

for (let i = 0; i < 50; i++) {
  list[i] = { name: 'f' + 0, sex: 'f' + i, age: i }
}
tableData.value = list
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
