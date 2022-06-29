<template>
  <el-menu
    background-color="rgb(53,59,65)"
    text-color="white"
    active-text-color="blue"
    :default-active="currentMenu"
    :router="true"
    @open="handleOpen"
    @close="handleClose"
    width="100%"
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
watch(
  route,
  () => {
    currentMenu.value = route.path
  },
  {
    immediate: true
  }
)
const menus = getUserMenus(
  [...publicRoutes, ...privateRoutes],
  store.getters.role
)
</script>

<style lang="scss" scoped>
</style>
