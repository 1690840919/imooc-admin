<template>
  <div class="">
    <el-collapse>
      <el-collapse-item
        v-for="item in functionList"
        :key="item.title"
        :title="item.title"
        :name="title"
      >
        <div>
          {{ item.content }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
const functionList = [
  {
    title: 'vue3 + 全家桶',
    content: '采用了相对较新的技术实现'
  },
  {
    title: 'Element-plus',
    content: '采用了相对较新的技术实现'
  },
  {
    title: '登陆页面',
    content: '采用了相对较新的技术实现'
  },
  {
    title: 'layout布局',
    content: '采用了相对较新的技术实现'
  },
  {
    title: '前端控制-动态路由',
    content: '采用了相对较新的技术实现'
  },
  {
    title: '语言国际化',
    content: '采用了相对较新的技术实现'
  }
]
</script>

<style lang="scss" scoped>
</style>
