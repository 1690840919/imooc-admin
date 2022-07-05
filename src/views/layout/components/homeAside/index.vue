<template>
  <div class="home-aside">
    <div class="logo-box">
      <div class="logo">
        <svg-icon :size="40" icon="user"></svg-icon>
      </div>
      <div class="title">管理系统</div>
    </div>
    <div class="menus-box">
      <Menu />
    </div>
  </div>
</template>

<script setup>
import Menu from './components/menu.vue'
</script>

<style lang="scss" scoped>
.home-aside {
  min-width: 200px;
  overflow: hidden;
  .logo-box {
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    color: white;

    .title {
      padding-left: 10px;
      font-size: 28px;
      font-weight: bolder;
      padding-right: 20px;
    }
  }

  .menus-box {
    .el-menu {
      border-right: none;
    }
  }
}
</style>
