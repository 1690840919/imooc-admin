<template>
  <div class="">
    <el-collapse>
      <el-collapse-item
        v-for="item in functionList"
        :key="item.title"
        :title="item.title"
        :name="title"
      >
        <ul v-html="item.content">
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
const functionList = [
  {
    title: '账号登陆+退出功能',
    content: `
      <li/>1、账号密码填写校验</li>
      <li/>2、账号密码提交校验</li>
      <li/>3、登陆后加载中效果</li>
      <li/>4、vuex中action进行登陆</li>
      <li/>5、登陆成功，存储token、userInfo、</li>
      <li/>6、跳转首页、跳转原来的页面</li>
      <li/>7、登陆成功、失败的提示</li>
      <li/>8、登陆失败后，请求被单个处理</li>
      <li/>9、登陆失败后，请求在全局被处理</li>
      <li/>10、登陆持久化</li>
    `
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
ul{
  list-style-type :none;
  padding-left: 0
}
</style>
