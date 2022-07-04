<template>
  <el-dialog
    :width="500"
    title="添加用户"
    :model-value="modelValue"
    :before-close="handleCloseBefore"
  >
    <el-form ref="dialogForm" label-width="80px">
      <el-form-item label="用户ID" prop="userID">
        <el-input v-model="createUserForm.userID" placeholder="请输入用户ID" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="createUserForm.username"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="用户状态" prop="userStatus">
        <el-select style="width: 100%" v-model="createUserForm.userStatus">
          <el-option :value="1" label="开通"></el-option>
          <el-option :value="2" label="关闭"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色" prop="userRole">
        <el-select style="width: 100%" v-model="createUserForm.userRole">
          <el-option :value="1" label="超级管理员"></el-option>
          <el-option :value="2" label="管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="upload-avatar-box"
        label="用户头像"
        prop="userAvatar"
      >
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <el-icon>
            <Plus />
          </el-icon>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeWindow">取 消</el-button>
        <el-button @click="handleCreateUserConfirm" type="primary">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue'
import { ElMessage } from 'element-plus'
const emits = defineEmits(['update:modelValue'])
defineProps({
  modelValue: {
    type: Boolean,
    require: true
  }
})
// 点击关闭前
const handleCloseBefore = () => {
  closeWindow()
}
// 点击关闭窗口
const closeWindow = () => {
  emits('update:modelValue', false)
}
// 添加用户表单
const createUserForm = reactive({
  userId: '',
  username: '',
  userRole: '',
  userStatus: '',
  userAvatar: ''
})
// 点击创建用户确认
const handleCreateUserConfirm = () => {
  console.log('正在创建用户')
  ElMessage.success('添加成功')
  closeWindow()
}
</script>

<style lang="scss" scoped>
</style>
