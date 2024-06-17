<template>
  <div class="container flex items-center w-full">
    <div class="file-image">
      <el-image
        v-show="!previewError"
        :src="url"
        :preview-src-list="[url ?? '']"
        preview-teleported
        hide-on-click-modal
        @error="onImageError"
        @load="onImageLoaded"
      />
      <a
        v-show="previewError && url"
        class="download i-mdi:tray-arrow-down"
        :href="url"
        download
        :filename="filename"
      />
      <i v-show="previewError && !url" class="download i-mdi:file-remove-outline"></i>
    </div>

    <div class="file-item">
      <div class="w-full overflow-hiddenr">
        <div :title="file.name" class="text-ellipsis overflow-hidden whitespace-nowrap">
          {{ file.name }}
        </div>

        <div class="flex items-center">
          <i
            :class="['icon', 'i-mdi:' + currrentStatus.icon, uploading ? 'animate-spin' : '']"
            :style="{ color: currrentStatus.color }"
          />
          <span class="text-xs text-gray-400 ml-1">
            {{ currrentStatus.text }}
            {{ file.percentage && !failed ? `(${file.percentage}%)` : '' }}
          </span>
        </div>
      </div>

      <span class="size-item">
        {{ sizeText }}
      </span>
    </div>

    <div class="action">
      <el-popconfirm
        title="确定要移除该文件吗?"
        @confirm="onClickRemove"
        width="180"
        confirm-button-text="移除"
        confirm-button-type="danger"
      >
        <template #reference>
          <el-button class="!ml-0" type="danger" size="small" link :disabled="uploading"
            >移除</el-button
          >
        </template>
      </el-popconfirm>

      <el-button
        class="!ml-0"
        type="primary"
        size="small"
        link
        @click="onClickSelect"
        :disabled="uploading"
        >更改</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useObjectUrl } from '@vueuse/core'
import type { UploadFile } from 'element-plus'

interface FileItemProps {
  file: UploadFile
}

const props = defineProps<FileItemProps>()
const emit = defineEmits<{
  (e: 'remove', file: UploadFile): void
  (e: 'select'): void
}>()

const { file } = toRefs(props)

const sizeText = computed(() => {
  const { size } = file.value
  if (!size) return ''
  return Math.ceil(size / 1000) + 'kb'
})

interface StatusOption {
  text: string
  color: string
  icon: string
}

const createOption = (text: string, icon: string, color: string) => ({
  color,
  icon,
  text
})

const failed = computed(() => file.value.status === 'fail')
const uploading = computed(() => file.value.status === 'uploading')

const statusConfig: Record<UploadFile['status'], StatusOption> = {
  ready: createOption('待上传', 'cloud-upload', '#0655dd'),
  success: createOption('已上传', 'check-circle-outline', '#67c23a'),
  uploading: createOption('上传中', 'loading', '#5188e7'),
  fail: createOption('上传失败', 'alert-circle-outline', '#f56c6c')
}

const currrentStatus = computed(() => statusConfig[file.value.status] ?? {})

const onClickRemove = () => emit('remove', file.value)

const previewError = ref(false)
const onImageError = () => (previewError.value = true)
const onImageLoaded = () => (previewError.value = false)

const url = computed(
  () => file.value.url ?? (file.value.raw ? useObjectUrl(file.value.raw).value : '')
)

const filename = computed(() => file.value.name ?? file.value.raw?.name)

const onClickSelect = () => {
  emit('select')
}
</script>

<style lang="scss" scoped>
.file-item {
  flex: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 18px;
  border: 1px dotted var(--el-border-color);
  border-radius: 4px;
  padding: 2px 5px;
  overflow: hidden;
  background: #fff;
  min-height: 40px;
  transition: all 0.1s ease-in;

  &:hover {
    .close-item {
      color: var(--el-color-danger);
    }
  }
}

.icon {
  margin-right: -1px;
  font-size: 16px;
}

.close-item {
  position: absolute;
  top: 0;
  right: 0;
  color: transparent;
  cursor: pointer;
  transition: all 0.1s linear;
  font-size: 12px;
  transform: scale(0.8);
  padding: 10px;
}
.size-item {
  display: inline-flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 5px;
  color: #9ca3af;
}

::v-deep(.file-image) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 4px;

  border: 1px dotted var(--el-border-color);
  box-sizing: border-box;
  padding: 2px;
  &:hover {
    opacity: 0.7;
    border-color: var(--el-color-primary);
  }

  .download {
    font-size: 22px;
  }

  .el-image {
    border-radius: 4px;

    width: 100%;
    height: 100%;
    .el-image__error {
      text-align: center;
      font-size: 12px;
    }
  }
}

.action {
  display: inline-flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  padding: 0 3px;
  opacity: 0;
}

.container {
  background-color: #fff;

  &:hover {
    .action {
      opacity: 1;
    }

    .file-item {
      border-color: var(--el-color-primary);
    }
  }
}
</style>
