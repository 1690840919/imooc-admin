<template>
  <el-dialog ref="dialog" :title="props.title" :width="props.width">
    <!-- 不具名插槽 -->
    <slot>这个一个插槽位置</slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps({
  // 弹窗标题
  title: {
    type: String,
    default: '弹窗标题'
  },
  // 弹窗宽度，默认300
  width: {
    type: Number,
    default: 300
  }
})
const emits = defineEmits()
// refs
const dialog = ref(null)
// 点击弹窗取消
const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}
// 点击弹窗确认
const handleConfirm = () => {
  emits('confirm')
  handleCancel()
}
</script>

<style lang="scss" scoped>
</style>
