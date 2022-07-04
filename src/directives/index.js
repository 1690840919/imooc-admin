import permission from './permission'
import print from 'vue3-print-nb'

export default app => {
  app.use(print) // 打印插件
  app.directive('permission', permission)
}
