<template>
  <div>
    <SelectDialog
      :model-value="list"
      :data="datas"
      :loading="loading"
      label-key="name"
      row-key="id"
      required
    >
      <template #header>
        <FilterBar :model="condition" @query="query">
          <FilterInput label="名称" prop="name"></FilterInput>
          <FilterSelect label="编码" prop="id" clearable></FilterSelect>
        </FilterBar>
      </template>

      <template #columns>
        <TableColumn label="名称" prop="name" copyable />
        <TableColumn copyable label="编码" prop="id" />
      </template>

      <template #footer>
        <TablePagination
          wrapper-class="!justify-start"
          v-model="paging"
          small
          background
          :disabled="loading"
          @change="query"
        />
      </template>
    </SelectDialog>
  </div>
</template>

<script setup lang="ts">
import { uniqueId } from 'lodash-es'

import SelectDialog from '@/components/standard-design/dialog/SelectDialog.vue'

import FilterBar from '@/components/standard-design/filter/refactor/filter-bar.vue'
import FilterInput from '@/components/standard-design/filter/refactor/components/filter-input.vue'
import FilterSelect from '@/components/standard-design/filter/refactor/components/filter-select.vue'

import TablePagination from '@/components/standard-design/table/TablePagination.vue'
import { useTable, type RequestPaging, type ResPagingData } from '@/composables/useTable'
import { sleep } from '@/utils'

const condition = ref({ name: '', id: '' })
const { datas, paging, loading, query } = useTable(fetchTableDatas, { immediate: true })

async function fetchTableDatas(
  page: RequestPaging
): Promise<ResPagingData<{ name: string; id: string }>> {
  console.log('condition :>> ', condition.value)
  await sleep(1000)
  return {
    records: patchCreateData(15, page.currentPage),
    current: page.currentPage,
    size: page.pageSize,
    total: 100
  }
}

const list = ref<{ name: string; id: string }[]>([])

const patchCreateData = (count: number, current: number) => {
  const r = []
  for (let i = 0; i < count; i++) {
    r.push({ name: '测试数据' + uniqueId(), id: current + '' + i })
  }
  return r
}
</script>

<style scoped></style>
