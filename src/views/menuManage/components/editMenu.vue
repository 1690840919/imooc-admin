<template>
  <!-- 编辑菜单 -->
  <el-dialog
    :width="400"
    title="编辑菜单"
    :model-value="modelValue"
    :before-close="closeWindow"
  >
    <el-form ref="dialogForm" label-width="80px">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input
          v-model="editMenuData.menuName"
          placeholder="请输入菜单名称"
        />
      </el-form-item>
      <el-form-item label="菜单路由" prop="menuPath">
        <el-input
          v-model="editMenuData.menuPath"
          placeholder="请输入菜单路由"
        />
      </el-form-item>
      <el-form-item label="菜单图标" prop="menuIcon">
        <el-input
          v-model="editMenuData.menuIcon"
          placeholder="请输入菜单图标"
        />
      </el-form-item>
      <el-form-item label="菜单排序" prop="menuRank">
        <el-input
          v-model="editMenuData.menuRank"
          placeholder="请输入菜单排序"
        />
      </el-form-item>
      <el-form-item label="菜单级别" prop="menuLevel">
        <el-select style="width: 100%" v-model="editMenuData.menuLevel">
          <el-option :value="1" label="一级"></el-option>
          <el-option :value="2" label="二级"></el-option>
          <el-option :value="3" label="三级"></el-option>
          <el-option :value="4" label="四级"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeWindow">取 消</el-button>
        <el-button @click="handleConfirmWindow" type="primary">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
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
  ElMessage.success('编辑成功')
  closeWindow()
}

// 编辑菜单表单
const editMenuData = ref({})
</script>

<style lang="scss" scoped>
</style>
