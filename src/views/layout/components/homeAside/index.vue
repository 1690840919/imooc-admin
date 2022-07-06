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
      <!-- <Menu
        router
        :data="menus"
        :defaultActive="currentMenu"
        :collapse="$store.getters.isCollapse"
        name="menuName"
        path="menuRouter"
        icon="menuIcon"
        children="children"
      /> -->
    </div>
  </div>
</template>

<script setup>
import Menu from './components/menu.vue'
// import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
// import { ref, watch } from 'vue'
// import { getUserMenus } from '@/utils/permission.js'
// import { publicRoutes, privateRoutes } from '@/router/index.js'

// const store = useStore()
// const route = useRoute()
// const currentMenu = ref('personal')
// // 监听路由变化，实时更新左侧菜单
// watch(
//   route,
//   () => {
//     currentMenu.value = route.path
//     // 跳转登录页，不记录tag
//     if (route.path === '/login') return
//     store.commit('layout/addRouteTag', {
//       title: route.meta.title,
//       path: route.path
//     })
//   },
//   {
//     immediate: true
//   }
// )
// // 根据路由和用户 身份获取菜单
// const menus = getUserMenus(
//   [...publicRoutes, ...privateRoutes],
//   store.getters.role
// )
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
