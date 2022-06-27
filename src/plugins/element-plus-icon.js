// 引入 element-plus 图标
import * as ElIconModules from '@element-plus/icons'

function isValidKey(key, object) {
  return key in object
}

export default {
  install(app) {
    Object.keys(ElIconModules).forEach(key => {
      if (isValidKey(key, ElIconModules)) {
        app.component(key, ElIconModules[key])
      }
    })
  }
}
