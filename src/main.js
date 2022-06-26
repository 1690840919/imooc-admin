import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引用全局样式
import '@/styles/index.scss'
// 引入element plus 引入消息提醒
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 全局挂载消息提醒
app.config.globalProperties.$message = ElMessage

app.use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
