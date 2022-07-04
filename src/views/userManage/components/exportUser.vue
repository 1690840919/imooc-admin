<template>
  <!-- 导出用户信息excel -->
  <el-dialog
    :width="400"
    title="导出为excel"
    :model-value="modelValue"
    :before-close="closeWindow"
  >
    <el-form ref="dialogForm" label-width="60px">
      <el-form-item label="文件名" prop="username">
        <el-input v-model="exportFileName" />
      </el-form-item>
      <div class="user-info-top-box"></div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeWindow">取 消</el-button>
        <el-button @click="handleConfirmWindow" type="primary">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
defineProps({
  modelValue: {
    type: Boolean,
    require: true
  }
})
const emits = defineEmits(['update:modelValue'])
const exportFileName = ref('用户信息表')

// 点击关闭窗口
const closeWindow = () => {
  emits('update:modelValue', false)
}
// 点击确认按钮
const handleConfirmWindow = () => {
  ElMessage.success('导出成功')
  closeWindow()
}
</script>

<style lang="scss" scoped>
</style>
