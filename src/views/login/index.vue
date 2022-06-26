<template>
  <div class="login-page">
    <el-form class="login-form-box" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="login-form-title">
        <h3>用户登陆</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" :prefix-icon="Avatar"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" :prefix-icon="Key"></el-input>
      </el-form-item>
      <el-button :loading-icon="Eleme" :loading="loginLoading" @click="handleLoginBtn" class="login-form-btn"
        type="primary">登陆</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { Avatar, Key, Eleme } from '@element-plus/icons-vue'
import { validatePassword } from '@/utils/validate.js'
// 登陆信息
const loginForm = ref({
  username: 'imooc-admin',
  password: '123456'
})
// 登陆校验
const loginRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 12, message: '请输入6-12位用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '请输入6-8位密码', trigger: 'blur' },
    { trigger: 'blur', validator: validatePassword() } // 自定义校验
  ]
})
const route = useRoute()
// 表单
const loginFormRef = ref(null)
// 登陆状态
const loginLoading = ref(false)
// vuex
const store = useStore()
// 点击登陆按钮
const handleLoginBtn = async function () {
  loginFormRef.value.validate(result => {
    // 验证不通过
    if (!result) return
    // 验证通过
    loginLoading.value = true
    store
      .dispatch('user/login', {
        ...loginForm.value,
        redirect: route.query.redirect
      })
      .then(result => {
        // console.log('result', result)
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        loginLoading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: rgb(42, 58, 77);

  .login-form-title {
    text-align: center;
    color: white;
    font-weight: bolder;
    font-size: 24px;
  }

  .login-form-box {
    padding: 50px 100px;
    width: 380px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  // ::v-deep .el-input__wrapper{
  //   background-color: #000;
  // }

  .login-form-btn {
    width: 100%;
    font-size: 12px;
  }
}
</style>
