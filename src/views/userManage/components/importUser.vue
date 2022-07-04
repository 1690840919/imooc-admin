<template>
  <!-- 导出用户信息excel -->
  <el-dialog
    :width="400"
    title="导出用户"
    :model-value="modelValue"
    :before-close="closeWindow"
  >
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽文件到这里或者 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          支持特定格式的excel文件
        </div>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeWindow">取 消</el-button>
        <el-button @click="handleConfirmWindow" type="primary">
          上传
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
defineProps({
  modelValue: {
    type: Boolean,
    require: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 点击关闭窗口
const closeWindow = () => {
  emits('update:modelValue', false)
}
// 点击确认按钮
const handleConfirmWindow = () => {
  ElMessage.success('上传成功')
  closeWindow()
}
</script>

<style lang="scss" scoped>
</style>
