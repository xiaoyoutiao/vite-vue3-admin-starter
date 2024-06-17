<template>
  <div class="thumbnail">
    <i class="tips" v-if="loaded">点击放大</i>
    <i v-if="images.length > 1" class="thumbnail__sum">{{ images.length }}</i>
    <el-image
      class="thumbnail__image"
      :src="images[0]"
      preview-teleported
      hide-on-click-modal
      :preview-src-list="images"
      @load="onLoaded"
      @error="onError"
    >
      <template #placeholder>
        <span class="thumbnail-placeholder !bg-transparent">
          <i>加载中</i>
        </span>
      </template>

      <template #error v-if="invalid">
        <span class="thumbnail-error">
          <i>暂无图片</i>
        </span>
      </template>
    </el-image>
  </div>
</template>

<script setup lang="ts">
import { isArray, isString } from 'lodash-es'
import { type ImageProps } from 'element-plus'

type SrcType = string | string[]

interface Props extends Partial<ImageProps> {
  parser?: (src?: SrcType) => string[]
}

const props = withDefaults(defineProps<Props>(), {
  parser: (src?: SrcType) => {
    if (isArray(src)) return src
    if (isString(src)) return [src]
    return []
  }
})

const images = computed<string[]>(() => props.parser(props.src))

const loaded = ref(false)
const onLoaded = () => (loaded.value = true)

const invalid = ref(false)
const onError = () => (invalid.value = !props.src)
</script>

<style scoped lang="scss">
.thumbnail {
  width: 100px;
  height: 50px;
  position: relative;
  overflow: hidden;

  cursor: pointer;

  &:hover {
    .tips {
      visibility: visible;
    }
  }

  .tips {
    pointer-events: none;
    visibility: hidden;
    z-index: 10;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }

  &__sum {
    pointer-events: none;
    z-index: 5;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    line-height: 15px;
    padding: 0 5px;
    border-radius: 0 0 4px 0;
    background-color: rgba(0, 0, 0, 0.6);
  }

  &__image {
    height: 100%;
    width: 100%;
  }

  &-placeholder,
  &-error {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--el-text-color-placeholder);
    background-color: var(--el-fill-color-light);
  }
}
</style>
