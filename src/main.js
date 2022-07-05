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
// 引入i18n
import i18n from '@/i18n/index.js'
// 引入自定义指令
import InstallDirective from '@/directives/index.js'
// 引入所有全局组件
import AllComponent from './components'

const app = createApp(App)
// 自定义指令
InstallDirective(app)
app.use(store)
  .use(router)
  .use(ElementPlus)
  .use(ElementPlusIcon)
  .use(AllComponent)
  .use(i18n)
  .mount('#app')
