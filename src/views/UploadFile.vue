<route lang="json">
{
  "meta": {
    "alias": "上传文件",
    "cacheable": true
  }
}
</route>

<template>
  <div class="page">
    <FileUploader></FileUploader>
  </div>
</template>

<script setup lang="ts">
import FileUploader from '@/components/standard-design/upload/FileUploader.vue'
</script>

<style scoped></style>
