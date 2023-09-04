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
    <FilterForm :model="condition" :columns="columns" @query="query"></FilterForm>

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

        <TableColumn
          prop="receiveTargetType"
          label="领取对象"
          :renderType="'enum'"
          width="90"
          :renderData="ReceiveTargetTypeEnum"
        />

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
import FilterForm from '@/components/filter-form/FilterForm.vue'
import { type ColumnItem } from '@/components/filter-form/form'
import { useTable, type RequestPaging } from '@/composables/useTable'
import TablePagination from '@/components/table/TablePagination.vue'
import TableColumn from '@/components/table/TableColumn.vue'

import TBButtonGroup from '@/components/table/tools/TBButtonGroup.vue'
import TBButton from '@/components/table/tools/TBButton.vue'
import TbGetter from '@/components/table/getter/TbGetter.vue'
import TBSettingBar from '@/components/table/tools/TBSettingBar.vue'
import { StatusText } from '@/components/text'

async function fetchTableDatas(page: RequestPaging) {
  const myHeaders = new Headers()
  myHeaders.append(
    'Token',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXF1ZXN0VHlwZSI6Im1hbmFnZSIsImN1cnJlbnRUaW1lTWlsbGlzIjoiMTY5Mzc5MjAwNDM0MyIsImV4cCI6MTY5Mzc5NTYwNCwidXNlcm5hbWUiOiJyeXUifQ.NheVwJYH6v7xBbFmgTChM5PryeRwa_JiudT0-pmwZtk'
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

const condition = reactive({})

const columns: ColumnItem[] = [
  {
    type: 'input',
    label: '编码',
    prop: 'actCode',
    rules: [{ required: true, message: '字段必须' }]
  },
  {
    type: 'input',
    label: '名称',
    prop: 'actName',
    rules: [{ required: true, message: '字段必须' }]
  },
  {
    type: 'select',
    label: '领取对象',
    prop: 'receiveTargetType',
    options: (resolve) => {
      setTimeout(() => {
        resolve([
          { label: '大耕户', value: 1 },
          { label: '服务商', value: 2 },
          { label: '管理商', value: 3 }
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

const tableData = ref<any>([])

const list = []

for (let i = 0; i < 50; i++) {
  list[i] = { name: 'f' + 0, sex: 'f' + i, age: i }
}
tableData.value = list

// const ReceiveTargetTypeEnum = {
//   1: '大耕户',
//   2: '服务商',
//   3: '管理商'
// }

const ReceiveTargetTypeEnum = [
  { label: '大耕户', value: 1 },
  { label: '服务商', value: 2 },
  { label: '管理商', value: 3 }
]

// const enumConponents = {
//   1: <el-text type="primary">铁粉</el-text>
// }

const onClickDetail = () => console.log('onClickDetail')
const onCopyConfirm = (row: any) => {
  console.log('row :>> ', row)
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

.page {
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
</style>
