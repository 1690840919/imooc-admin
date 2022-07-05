<template>
  <div class="page-box">
    <el-pagination
      background
      layout="prev, pager, next"
      :currentPage="props.page"
      :page-size="props.limit"
      :total="props.total"
      :page-sizes="[5, 8, 10]"
      @prev-text="handlePrevText"
      @next-text="handleNextText"
      @size-change="handleLimitChange"
      @current-change="handlePageChange"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
// 这里没有接收的属性，在外面传进来会自定传进去组件
// 建议都接受一下，以便阅读理解
const props = defineProps({
  // 总数多少条
  total: {
    type: Number
  },
  // 一页限制显示多少条
  limit: {
    type: Number
  },
  // 当前页码
  page: {
    type: Number
  },
  // 页码变化后回调函数
  pageCallback: {
    type: Function,
    default: () => {}
  }
})
const emits = defineEmits(['update:page', 'update:limit'])
// 当每页显示条数改变
const handleLimitChange = limit => {
  // 更改外边绑定的条数限制
  emits('update:limit', limit)
  // 更改外边绑定的页码，从新开始
  emits('update:page', 1)
  // 执行回调函数
  props.pageCallback()
}
// 当前页码改变
const handlePageChange = page => {
  // 改变外边绑定的页码
  emits('update:page', page)
  // 执行回调函数
  props.pageCallback()
}
</script>

<style lang="scss" scoped>
.page-box {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  justify-content: center;
}
</style>
