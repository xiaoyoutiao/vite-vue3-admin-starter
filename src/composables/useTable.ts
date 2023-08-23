import { type UnwrapRef } from 'vue'
import { omit } from 'xe-utils'

export interface ResPaging {
  size: number
  current: number
  total: number
}

export interface Paging {
  currentPage: number
  pageSize: number
  total: number
}

export type RequestPaging = Omit<Paging, 'total'>

export interface ResPagingData<T> {
  current: number
  size: number
  total: number
  records: T[]
}

function getInitailPaging(): Paging {
  return {
    currentPage: 1,
    pageSize: 10,
    total: 0
  }
}

export interface UseTableOptions {
  immediate?: boolean
}

export function useTable<T>(
  executor: (paging: RequestPaging) => Promise<ResPagingData<T>>,
  { immediate = true }: UseTableOptions = {}
) {
  const datas = ref<T[]>([])

  const paging = ref<Paging>(getInitailPaging())

  const loading = ref(false)

  async function query() {
    try {
      loading.value = true
      const { records = [], total = 0 } = await executor(omit(paging.value, ['total'])).finally(
        () => (loading.value = false)
      )

      datas.value = records as UnwrapRef<T[]>
      paging.value.total = total
    } catch (error) {
      datas.value = []
      throw error
    }
  }

  function reload() {
    paging.value = getInitailPaging()
    query()
  }

  function refresh() {
    query()
  }

  if (immediate) {
    onMounted(() => query())
  }

  return {
    datas,
    paging,
    loading,
    query,
    reload,
    refresh
  }
}
