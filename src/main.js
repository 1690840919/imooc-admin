import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引用全局样式
import '@/styles/index.scss'
// 引入element-plus插件
import ElementPlus from './plugins/element-plus'
// 引入element-plus-icon插件
import ElementPlusIcon from './plugins/element-plus-icon'

const app = createApp(App)
app.use(store)
  .use(router)
  .use(ElementPlus)
  .use(ElementPlusIcon)
  .mount('#app')
