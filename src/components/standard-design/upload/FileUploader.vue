<template>
  <div class="page">
    <el-upload
      v-model:file-list="fileList"
      ref="uploadRef"
      action="/server/api/lardmee-base/file/upload"
      :auto-upload="false"
      method="post"
      :multiple="true"
      :limit="2"
    >
      <template #file="{ file }">
        <FileItem :file="file" @remove="handleRemove" @select="handleSelect(file)"></FileItem>
      </template>

      <template #default>
        <!-- <el-button type="primary" @click="onClickSelect">选择文件</el-button> -->
        <el-button class="ml-2" type="success" :disabled="!enabledSubmit" @click="submitUpload">
          {{ uploading ? '上传中' : '开始上传' }}
        </el-button>
      </template>

      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>

      <template #tip>
        <slot name="tip"></slot>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import type { UploadInstance, UploadFile, UploadRawFile, ElButton } from 'element-plus'
import { useFileDialog } from '@vueuse/core'

import FileItem from '@/components/standard-design/upload/FileItem.vue'

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value?.submit()
}

const fileList = ref<UploadFile[]>([])

const uploading = computed(() => fileList.value.some((file) => file.status === 'uploading'))
const enabledSubmit = computed(
  () => !uploading.value && fileList.value.some((file) => file.status === 'ready')
)

const handleRemove = (file: UploadFile) => uploadRef.value?.handleRemove(file)

const { open, onChange, reset } = useFileDialog()

const targetChangeFile = ref<UploadFile | null>(null)
const handleSelect = (fileItem: UploadFile) => {
  targetChangeFile.value = fileItem
  reset()
  open({ multiple: false })
}

onChange((files) => {
  if (!files?.length) return

  const file = files[0] as UploadRawFile

  if (!targetChangeFile.value) {
    file.uid = new Date().getTime()
    uploadRef.value?.handleStart(file)
    return
  }

  file.uid = targetChangeFile.value.uid
  const uploadFile: UploadFile = {
    name: file.name,
    percentage: 0,
    status: 'ready',
    size: file.size,
    raw: file,
    uid: file.uid
  }
  const index = fileList.value.findIndex((f) => f.uid === targetChangeFile.value?.uid)
  if (!~index) return
  fileList.value[index] = uploadFile
})

const onClickSelect = () => {
  targetChangeFile.value = null
  open({ multiple: false })
}
</script>

<style scoped>
.page {
  width: 350px;
  background-color: #fff;
  padding: 10px;
}

.i-mdi:loading {
  font-size: 20px;
  transform: rotate(180deg);
}
</style>
