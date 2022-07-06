<template>
  <el-menu
    background-color="rgb(53,59,65)"
    text-color="white"
    active-text-color="blue"
    :default-active="currentMenu"
    :router="true"
    :collapse="$store.getters.isCollapse"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <menu-item :data="menus" />
  </el-menu>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MenuItem from './menuItem.vue'
import { ref, watch } from 'vue'
import { getUserMenus } from '@/utils/permission.js'
import { publicRoutes, privateRoutes } from '@/router/index.js'

const store = useStore()
const route = useRoute()
const currentMenu = ref('personal')
// 监听路由变化，实时更新左侧菜单
watch(
  route,
  () => {
    currentMenu.value = route.path
    // 跳转登录页，不记录tag
    if (route.path === '/login') return
    store.commit('layout/addRouteTag', {
      title: route.meta.title,
      path: route.path
    })
  },
  {
    immediate: true
  }
)
// 根据路由和用户 身份获取菜单
const menus = getUserMenus(
  [...publicRoutes, ...privateRoutes],
  store.getters.role
)
</script>

<style lang="scss" scoped>
</style>
