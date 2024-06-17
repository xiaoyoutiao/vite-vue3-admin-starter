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
  <div class="page">
    <FilterBar :model="condition" @query="onQuery">
      <FilterInput label="产品编码" prop="code"></FilterInput>
      <FilterSelect label="产品名称" prop="name" clearable></FilterSelect>
      <FilterDatePicker label="时间范围" prop="dateRange" clearable type="daterange" />
      <FilterCascader label="地区" prop="areaCode" :options="cascaderOptions"></FilterCascader>
    </FilterBar>

    <div class="h-80%">
      <TBSettingBar @refresh="query">
        <el-button type="primary">导入产品</el-button>
        <el-button>导出产品</el-button>
        <el-button>批量上架</el-button>
        <el-button>批量下架</el-button>
      </TBSettingBar>

      <el-table :data="datas" height="100%" v-loading="loading" width="100%" border>
        <TableColumn prop="pictureUrl" label="图片" align="left" width="125">
          <template #default="{ value }">
            <TabularThumbnail :src="value"></TabularThumbnail>
          </template>
        </TableColumn>

        <TableColumn
          label="名称"
          prop="productName"
          width="200"
          copyable
          show-overflow-tooltip
          header-tooltip="链接状态 1-待审核 2-审核通过 3-审核不通过 前端不用传"
        />

        <TableColumn copyable label="编码" prop="productCode" width="200" />

        <TableColumn
          prop="price"
          label="售价(元)"
          width="120"
          :currency="{ precision: 2 }"
        ></TableColumn>

        <TableColumn
          label="是否售罄"
          prop="haveExchangeRatio"
          align="center"
          width="90"
          render-type="whether"
        >
          <template #default="{ value }">
            <TabularWhether :value="value" />
          </template>
        </TableColumn>

        <TableColumn label="用户类型" prop="userType" width="100">
          <template #default="{ value }">
            <TabularGetter
              :value="value"
              :options="[
                { value: 1, label: '消费者' },
                { value: 2, label: '商户' },
                { value: 3, label: '经销商' }
              ]"
            />
          </template>
        </TableColumn>

        <TableColumn label="标签" prop="tags" min-width="420">
          <template #default="{ value }">
            <el-tag class="m-1" v-for="tag in value" :key="tag" effect="plain">{{ tag }}</el-tag>
          </template>
        </TableColumn>

        <TableColumn label="生效日期">
          <TableColumn label="开始时间" prop="startTime" width="150"></TableColumn>
          <TableColumn label="结束时间" prop="endTime" width="150"></TableColumn>
        </TableColumn>

        <TableColumn label="状态" prop="status" align="center" fixed="right" width="90">
          <template #default="{ value }">
            <TabularGetter
              :value="value"
              :options="[
                { value: 1, label: '禁用', type: 'error' },
                { value: 2, label: '投放', type: 'success' },
                { value: 3, label: '作废', type: 'info' }
              ]"
            >
              <template #default="{ row }">
                <TabularStatusText :type="row.type">{{ row.label }}</TabularStatusText>
              </template>
            </TabularGetter>
          </template>
        </TableColumn>

        <TableColumn prop="index" label="操作" fixed="right" width="130" align="center">
          <template #default>
            <TabularButtonGroup>
              <TabularButton permission="read" @click="onClickDetail">详情</TabularButton>

              <TabularButton permission="update">更新</TabularButton>

              <TabularButton permission="create" confirm disabled>复制</TabularButton>

              <TabularButton permission="delete" type="danger" confirm="确定要移除该项吗?">
                删除
              </TabularButton>

              <TabularButton permission="log">查看日志</TabularButton>
            </TabularButtonGroup>
          </template>
        </TableColumn>
      </el-table>

      <TablePagination v-model="paging" @change="query" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CascaderOption } from 'element-plus'

import FilterBar from '@/components/standard-design/filter/refactor/filter-bar.vue'
import FilterInput from '@/components/standard-design/filter/refactor/components/filter-input.vue'
import FilterSelect from '@/components/standard-design/filter/refactor/components/filter-select.vue'
import FilterDatePicker from '@/components/standard-design/filter/refactor/components/filter-date-picker.vue'
import FilterCascader from '@/components/standard-design/filter/refactor/components/filter-cascader.vue'

import TablePagination from '@/components/standard-design/table/TablePagination.vue'
import TableColumn from '@/components/standard-design/table/TableColumn.vue'

import TabularButtonGroup from '@/components/standard-design/table/components/TabularButtonGroup.vue'
import TabularButton from '@/components/standard-design/table/components/TabularButton.vue'
import TabularGetter from '@/components/standard-design/table/components/TabularGetter.vue'
import TBSettingBar from '@/components/standard-design/table/tools/TBSettingBar.vue'

import TabularThumbnail from '@/components/standard-design/table/components/TabularThumbnail.vue'
import TabularWhether from '@/components/standard-design/table/components/TabularWhether.vue'
import TabularStatusText from '@/components/standard-design/table/components/TabularStatusText.vue'

import { useTable, type RequestPaging } from '@/composables/useTable'

const condition = reactive({
  // code: '12',
  // name: 'ryu',
  // dateRange: ['2023-09-05', '2023-09-06'],
  areaCode: ['1', '3']
})

async function fetchTableDatas(page: RequestPaging) {
  const res = await fetch(
    'https://yapi.xdp8.cn/mock/558/lardmee-mall-product/mallProductInfo/pageList',
    {
      method: 'POST',
      body: JSON.stringify({
        ...page,
        ...condition
      })
    }
  )
  const data = await res.json()

  data.data.records = data.data.records.map(
    (i: any) => ((i.image = 'https://picsum.photos/1024/512'), i)
  )

  return data?.data
}

const { datas, loading, paging, query } = useTable(fetchTableDatas)

const onClickDetail = () => console.log('onClickDetail')

const onQuery = (r: unknown) => console.log('r :>> ', r)

const cascaderOptions: CascaderOption[] = [
  {
    label: '一级',
    value: '1',
    children: [
      { label: '耳机', value: '2' },
      { label: '手机', value: '3' }
    ]
  }
]
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

.page {
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
</style>

