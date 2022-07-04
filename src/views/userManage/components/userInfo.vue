<template>
  <!-- 显示用户信息 -->
  <el-dialog :width="600" title="用户信息" :model-value="modelValue">
    <el-form ref="dialogForm" label-width="80px">
      <div class="user-info-top-box">
        <div class="user-info-left">
          <el-form-item label="用户ID" prop="userID">
            <el-input placeholder="请输入用户ID" />
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入用户名" />
          </el-form-item>
        </div>
        <div class="user-info-right">
          <el-form-item
            class="upload-avatar-box"
            label="用户头像"
            prop="userAvatar"
          >
            <el-avatar
              shape="square"
              :size="100"
              :src="userInfoWindowData.avatar"
            />
          </el-form-item>
        </div>
      </div>

      <el-form-item label="用户状态" prop="userStatus">
        <el-select style="width: 100%">
          <el-option :value="1" label="开通"></el-option>
          <el-option :value="2" label="关闭"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色" prop="userRole">
        <el-select style="width: 100%">
          <el-option :value="1" label="超级管理员"></el-option>
          <el-option :value="2" label="管理员"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="closeWindow">取 消</el-button> -->
        <el-button @click="handleConfirmWindow" type="primary">
          打印
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  userInfoWindowData: {
    type: Object,
    require: true
  },
  showUserInfoWindow: {
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
  closeWindow()
}
</script>

<style lang="scss" scoped>
.user-info-top-box {
  display: flex;
  div {
    flex: 1;
  }
}
</style>
