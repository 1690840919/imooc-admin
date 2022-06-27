<template>
  <div class="svg-icon-box">
    <!-- 展示外部SVG图标 -->
    <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className"></div>
    <!-- 展示element-plus内部SVG图标 -->
    <el-icon v-else :size="size" :color="color" class="no-inherit svg-icon">
      <component :is="icon" />
    </el-icon>
  </div>
</template>

<script setup>
// 案例
// <svg-icon :size="20" icon="Share" color="#000" />
// <svg-icon icon="https://res.lgdsunday.club/user.svg" />
import { defineProps, computed } from 'vue'
import { isExternal as external } from '@/utils/validate.js'
const props = defineProps({
  // icon图标
  icon: {
    type: String,
    require: true
  },
  // 图标大小
  size: {
    type: String
  },
  // 图标颜色
  color: {
    type: String
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})
const isExternal = computed(() => external(props.icon))
// 内部图标
// const iconName = computed(() => `${props.icon}`)
// 外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
</script>

<style lang="scss" scoped>
.svg-icon-box {
  .svg-external-icon {
    // currentColor 未指定颜色，则会继承父元素颜色
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }

  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em; // 偏移量
    fill: currentColor; // currentColor 未指定颜色，则会继承父元素颜色
    overflow: hidden;
  }
}
</style>
