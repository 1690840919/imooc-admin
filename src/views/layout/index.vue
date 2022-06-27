<template>
  <div class='home-page'>
    <el-container>
      <el-aside class="home-aside" width="200px">
        <home-aside />
      </el-aside>
      <el-container>
        <el-header class="home-header">
          <home-header />
        </el-header>
        <el-main class="home-main">
          <home-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import HomeAside from './components/homeAside/index.vue'
import HomeHeader from './components/homeHeader/index.vue'
import HomeMain from './components/homeMain/index.vue'
</script>

<style lang="scss" scoped>
.home-page {
  .home-aside {
    height: 100vh;
    background: rgb(179, 192, 208)
  }

  .home-header {
    width: 100%;
  }

  .home-main {
    background-color: pink
  }
}
</style>
