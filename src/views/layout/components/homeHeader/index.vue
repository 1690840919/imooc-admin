<template>
  <div class='home-header'>
    <div class="breadcrumb-box">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menus-box">
      <el-dropdown>
        <span class="el-dropdown-link">
          超级管理员
          <el-icon class="el-icon--right">
            <svg-icon icon="user" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleCancelLoginBtn">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/svgIcon/index.vue'
import { ArrowRight } from '@element-plus/icons-vue'
// 点击退出登陆
const handleCancelLoginBtn = () => {
  console.log('退出登陆')
}
</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .breadcrumb-box {}

  .menus-box {
    display: flex;
    align-items: center;
  }
}
</style>
