<template>
  <div class="choose-icon-page">
    <el-button @click="handleChooseBtn">
      <slot>图标选择</slot>
    </el-button>
    <div class="choose-icon-dialog">
      <el-dialog :width="540" title="图标选择" v-model="dialogVisible">
        <div class="container">
          <div
            class="item"
            v-for="(name, index) in Object.keys(ElIcons)"
            :key="index"
            @click="clickIcon(name)"
          >
            <div class="text">
              <svg-icon :size="28" :icon="name" />
            </div>
            <div class="icon">{{ name }}</div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import * as ElIcons from '@element-plus/icons'
const emits = defineEmits(['change'])
const dialogVisible = ref(false)
// 点击图标选择按钮
const handleChooseBtn = () => {
  dialogVisible.value = true
}
// 点击选中图标
const clickIcon = icon => {
  dialogVisible.value = false
  emits('change', icon)
}
</script>

<style lang="scss" scoped>
.choose-icon-page {
  .choose-icon-dialog {
    .container {
      min-width: 520px;
      height: 400px;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 120px;
        height: 60px;
        padding: 20px 0;
        text-align: center;
        cursor: pointer;
      }

      .item:hover {
        background: #eee;
      }
    }
  }
}
</style>
