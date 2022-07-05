<template>
  <div class="theme-select-box">
    <el-tooltip
      class="box-item"
      effect="dark"
      content="更换主题"
      placement="bottom"
    >
      <svg-icon
        @click="handleThemeSelect"
        type="iconfont"
        className="icon-pifu"
      />
    </el-tooltip>
    <!-- 选择颜色 -->
    <select-color v-model="showSelectColor" />
  </div>
</template>

<script setup>
import SelectColor from './selectColor.vue'
import { ref } from 'vue'
const showSelectColor = ref(false)
// 点击更换主题
const handleThemeSelect = () => {
  showSelectColor.value = true
}
</script>

<style lang="scss" scoped>
.theme-select-box {
  cursor: pointer;
}
</style>
