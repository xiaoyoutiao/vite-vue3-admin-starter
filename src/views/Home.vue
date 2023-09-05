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
    {{ condition }}
    <FilterBar :model="condition" @query="onQuery">
      <FilterInput label="产品编码" prop="code" required></FilterInput>
      <FilterSelect label="产品名称" prop="name" clearable></FilterSelect>
      <FilterDatePicker
        label="时间范围"
        prop="dateRange"
        required
        clearable
        type="daterange"
      ></FilterDatePicker>
      <FilterCascader label="地区" prop="areaCode" required></FilterCascader>
    </FilterBar>

    <div class="h-80%">
      <TBSettingBar @refresh="query"></TBSettingBar>

      <el-table :data="datas" height="100%" v-loading="loading" width="100%" border>
        <TableColumn type="expand">
          <template #default="{ row }">
            <el-descriptions title="优惠券信息" class="px-10" size="small" :column="4" border>
              <el-descriptions-item label="单张面值">
                {{ row.couponSingleAmount }}元
              </el-descriptions-item>
              <el-descriptions-item label="发行数量：">
                {{ row.collectCount }}张
              </el-descriptions-item>
              <el-descriptions-item label="活动总额：">
                {{ row.couponTotalAmount }}元
              </el-descriptions-item>
              <el-descriptions-item label="已领取数：">
                {{ row.couponReceiveCount }}张
              </el-descriptions-item>
              <el-descriptions-item label="剩余张数：">
                {{ row.couponSurplusCount }}张
              </el-descriptions-item>
              <el-descriptions-item label="剩余额度：">
                {{ row.couponSurplusAmount }}元
              </el-descriptions-item>
              <el-descriptions-item label="已核销数：">
                {{ row.couponUseCount }}张
              </el-descriptions-item>
              <el-descriptions-item label="核销比例：">
                {{ row.couponUseRatio }}%
              </el-descriptions-item>
            </el-descriptions>

            <el-descriptions title="现金券信息" class="px-10 mt-2" size="small" :column="2" border>
              <el-descriptions-item label="发放金额">
                {{ row.couponSingleAmount }}元
              </el-descriptions-item>
              <el-descriptions-item label="已核销金额">
                {{ row.cashUseAmount }}元
              </el-descriptions-item>
              <el-descriptions-item label="核销比例">
                {{ row.cashUseRatio }}%
              </el-descriptions-item>
              <el-descriptions-item label="领取限制">
                {{ row.receiveNumber }}/人
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </TableColumn>

        <TableColumn prop="id" label="ID" align="left" />

        <TableColumn
          label="名称"
          prop="actName"
          show-overflow-tooltip
          header-tooltip="链接状态 1-待审核 2-审核通过 3-审核不通过 前端不用传"
        />

        <TableColumn label="编码" prop="actCode" show-overflow-tooltip />

        <TableColumn
          label="类型"
          prop="actType"
          :renderType="'enum'"
          :renderData="[
            { label: '铁粉', value: 1 },
            { label: '裂变', value: 2 }
          ]"
        />

        <TableColumn prop="receiveTargetType" label="领取对象" :renderType="'enum'" width="90" />

        <TableColumn
          label="是否分摊"
          prop="haveExchangeRatio"
          align="center"
          width="90"
          render-type="whether"
        />

        <TableColumn label="可邀铁粉(人)" prop="peopleCount" width="120" />

        <TableColumn
          label="可兑换产品"
          prop="convertibleProduct"
          width="200"
          show-overflow-tooltip
        />

        <TableColumn label="生效时间" width="300">
          <template #default="{ row }">
            {{ row.actEffectStartTime }} ~ {{ row.actEffectEndTime }}
          </template>
        </TableColumn>

        <TableColumn label="状态" prop="actStatus" align="center" fixed="right" width="90">
          <template #default="{ value }">
            <TbGetter
              :value="value"
              :options="[
                { value: 2, label: '已投放', type: 'success' },
                { value: 3, label: '已作废', type: 'info' }
              ]"
            >
              <template #default="{ row }">
                <StatusText :type="row.type">{{ row.label }}</StatusText>
              </template>
            </TbGetter>
          </template>
        </TableColumn>

        <TableColumn prop="index" label="操作" fixed="right" width="130" align="center">
          <template #default>
            <TBButtonGroup>
              <TBButton permission="read" @click="onClickDetail">详情</TBButton>

              <TBButton permission="update">更新</TBButton>

              <TBButton permission="create" confirm disabled>复制</TBButton>

              <TBButton permission="delete" type="danger" confirm="确定要移除该项吗?">
                删除
              </TBButton>

              <TBButton permission="log">查看日志</TBButton>
            </TBButtonGroup>
          </template>
        </TableColumn>
      </el-table>

      <TablePagination v-model="paging" @change="query" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FilterBar from '@/components/standard-design/filter/refactor/filter-bar.vue'
import FilterInput from '@/components/standard-design/filter/refactor/components/filter-input.vue'
import FilterSelect from '@/components/standard-design/filter/refactor/components/filter-select.vue'
import FilterDatePicker from '@/components/standard-design/filter/refactor/components/filter-date-picker.vue'
import FilterCascader from '@/components/standard-design/filter/refactor/components/filter-cascader.vue'

// import FilterForm from '@/components/standard-design/filter/FilterForm.vue'
import { useTable, type RequestPaging } from '@/composables/useTable'
import TablePagination from '@/components/standard-design/table/TablePagination.vue'
import TableColumn from '@/components/standard-design/table/TableColumn.vue'

import TBButtonGroup from '@/components/standard-design/table/tools/TBButtonGroup.vue'
import TBButton from '@/components/standard-design/table/tools/TBButton.vue'
import TbGetter from '@/components/standard-design/table/getter/TbGetter.vue'
import TBSettingBar from '@/components/standard-design/table/tools/TBSettingBar.vue'
import { StatusText } from '@/components/text'

async function fetchTableDatas(page: RequestPaging) {
  const myHeaders = new Headers()
  myHeaders.append(
    'Token',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXF1ZXN0VHlwZSI6Im1hbmFnZSIsImN1cnJlbnRUaW1lTWlsbGlzIjoiMTY5MzgxNjY4NTY4MiIsImV4cCI6MTY5MzgyMDI4NSwidXNlcm5hbWUiOiJyeXUifQ.yqCA5nCD5--hgMkhWoQwdualbsCxshAaGElPTsU3ils'
  )

  myHeaders.append('Content-Type', 'application/json')

  const res = await fetch('/server/api/lardmee-user/lardmeeActivity/listByPage', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      ...page,
      ...condition
    })
  })
  const data = await res.json()

  data.data.records = data.data.records.map(
    (i: any) => ((i.image = 'https://picsum.photos/1024/512'), i)
  )

  return data?.data
}

const { datas, loading, paging, query } = useTable(fetchTableDatas)

const condition = reactive({
  // code: '12',
  // name: 'ryu',
  // dateRange: ['2023-09-05', '2023-09-06'],
  // areaCode: '2035'
})

const onClickDetail = () => console.log('onClickDetail')

const onQuery = (r: unknown) => console.log('r :>> ', r)
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
