<template>
  <div class="bg-white flex items-center">
    <div class="flex-1 flex items-center flex-wrap">
      <el-form ref="formRef" inline size="small" :model="props.model" @validate="onValidate">
        <slot></slot>
      </el-form>
    </div>

    <div class="px-2">
      <el-divider direction="vertical" />
      <el-button link type="primary" size="small" @click="onClickReset">重置</el-button>
      <el-button type="primary" :disabled="!isValidForm" @click="onClickQuery">
        <span class="i-mdi:magnify mr-1" />
        <span>查询</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FORM_INJECT_KEY, type ElForm } from './form'

interface Props {
  model: any
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'query'): void
}>()
const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const isValidForm = ref(true)

const onClickQuery = async () => {
  try {
    isValidForm.value = true
    await formRef.value?.validate()
    emit('query')
  } catch (e) {
    isValidForm.value = false
  }
}

const onClickReset = () => formRef.value?.resetFields()
const onValidate = () => (isValidForm.value = true)

provide(FORM_INJECT_KEY, { model: props.model })
</script>

<style scoped lang="scss"></style>
