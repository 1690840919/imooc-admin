<template>
  <div>
    <!-- 遍历所有菜单 -->
    <temp v-for="item in data" :key="item.id">
      <!-- 存在子菜单的 -->
      <el-sub-menu v-if="item.children" :index="item.menuRouter">
        <template #title>
          <span class="icon-box">
            <svg-icon :size="20" :icon="item.menuIcon" />
          </span>
          <span>{{ item.menuName }}</span>
        </template>
        <!-- 子菜单 -->
        <menu-item :data="item.children" />
      </el-sub-menu>
      <!-- 不存在子菜单的 -->
      <el-menu-item v-else :index="item.menuRouter">
        <span class="icon-box">
          <svg-icon :size="20" :icon="item.menuIcon" />
        </span>
        <!-- template是为了折叠后能够显示菜单名提示 -->
        <template #title>
          <span>{{ item.menuName }}</span>
        </template>
      </el-menu-item>
    </temp>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/svgIcon/index.vue'
import menuItem from './menuItem.vue'
import { defineProps } from 'vue'
defineProps({
  data: {
    type: Array
  }
})
</script>

<style lang="scss" scoped>
.icon-box {
  padding: 0 15px 0 0px;
  display: inline-block;
}
</style>
