<template>
  <el-dialog
    :model-value="modelValue"
    title="主题变更"
    :width="300"
    :before-close="close"
  >
    <div class="box">
      <el-color-picker
        v-model="color"
        show-alpha
        :predefine="predefineColors"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleWindowConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
defineProps({
  modelValue: {
    type: Boolean,
    require: true
  }
})
const store = useStore()
const emits = defineEmits(['update:modelValue'])
const color = ref(store.getters.themeColor)
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
// 关闭
const close = () => {
  emits('update:modelValue', false)
}
// 点击确认更换颜色
const handleWindowConfirm = () => {
  store.commit('layout/setThemeColor', color.value)
  close()
  ElMessage.success('更换成功')
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}
</style>
