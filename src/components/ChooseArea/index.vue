<template>
  <div class="choose-area-container">
    <template v-if="props.type === 1">
      <el-cascader
        v-model="cascaderValue"
        class="cascader-box"
        :options="AllAreas"
      >
        <template #default="{ node, data }">
          <span>{{ data.name }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
    </template>
    <template v-else-if="props.type === 3">
      <el-select v-model="province" placeholder="请选择省份">
        <el-option
          v-for="item in allProvince"
          :key="item.code"
          :value="item.code"
          :label="item.name"
        >
        </el-option>
      </el-select>
      <el-select v-model="city" placeholder="请选择城市">
        <el-option
          v-for="item in allCity"
          :key="item.code"
          :value="item.code"
          :label="item.name"
        >
        </el-option>
      </el-select>
      <el-select v-model="area" placeholder="请选择区域">
        <el-option
          v-for="item in allAreas"
          :key="item.code"
          :value="item.code"
          :label="item.name"
        >
        </el-option>
      </el-select>
    </template>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import AllAreas from './area.json'
const props = defineProps({
  type: {
    type: Number,
    default: 1
  }
})
const emits = defineEmits(['change'])
// 可选省份
const allProvince = ref(AllAreas)
// 可选城市
const allCity = ref([])
// 可选区域
const allAreas = ref([])
// 省份
const province = ref('')
// 城市
const city = ref('')
// 区域
const area = ref('')
// 监听省份变化
watch(
  () => province.value,
  (newValue, oldValue) => {
    if (!newValue) return
    // 根据所选择的省份找到下一级数据
    allCity.value = allProvince.value.find(
      item => item.code === province.value
    ).children
    // 清空城市
    city.value = ''
    // 清空区域
    area.value = ''
    // 清空可选区域
    allAreas.value = []
  }
)
// 监听城市变化
watch(
  () => city.value,
  (newValue, oldValue) => {
    if (!newValue) return
    // 根据所选择的城市找到下一级数据
    allAreas.value = allCity.value.find(
      item => item.code === city.value
    ).children
    // 清空区域
    area.value = ''
  }
)
// 监听区域变化
watch(
  () => area.value,
  (newValue, oldValue) => {
    if (!newValue) return
    // 选后最后一个，触发change事件
    emits('change', {
      province: {
        code: province.value,
        name: allProvince.value.find(item => item.code === province.value).name
      },
      city: {
        code: city.value,
        name: allCity.value.find(item => item.code === city.value).name
      },
      area: {
        code: area.value,
        name: allAreas.value.find(item => item.code === area.value).name
      }
    })
  }
)
const cascaderValue = ref([])
// 监听cascaderValue值
watch(
  () => cascaderValue.value,
  (newValue, oldValue) => {
    console.log('sss', cascaderValue.value)
  }
)
</script>

<style lang="scss" scoped>
.choose-area-container {
  display: flex;
  width: 100%;
}
::v-deep .cascader-box {
  width: 100%;
}
</style>
