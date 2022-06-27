<template>
  <el-menu background-color="rgb(53,59,65)" text-color="white" active-text-color="blue" :default-active="currentMenu"
    :router="true" @open="handleOpen" @close="handleClose" width="100%">
    <menu-item :data="menus" />
  </el-menu>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MenuItem from './menuItem.vue'
import { ref, watch } from 'vue'
const store = useStore()
const route = useRoute()
const menus = store.state.user.menus
const currentMenu = ref('personal')
currentMenu.value = route.path.split('/').pop()
watch(route, () => {
  currentMenu.value = route.path.split('/').pop()
})

</script>

<style lang="scss" scoped>
</style>
