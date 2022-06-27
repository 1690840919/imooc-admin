<template>
  <div class="home-header">
    <div class="breadcrumb-box">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          :key="item.meta.title"
          v-for="item in $route.matched"
          :to="{ path: item.path }"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menus-box">
      <el-dropdown>
        <span v-if="$store.state.user.userInfo" class="el-dropdown-link">
          {{ $store.state.user.userInfo.name }}
          <el-icon class="el-icon--right">
            <svg-icon icon="user" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleCancelLoginBtn"
              >退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/svgIcon/index.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
const store = useStore()
// 点击退出登陆
const handleCancelLoginBtn = () => {
  store.dispatch('user/logout')
  ElMessage.success('退出成功')
}
console.log('route', useRoute().matched)
</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .breadcrumb-box {
  }

  .menus-box {
    display: flex;
    align-items: center;
  }
}
</style>
