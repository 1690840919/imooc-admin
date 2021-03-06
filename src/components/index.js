export default {
  install(app) {
    // true 扫描子文件夹
    const AllFiles = require.context('./', true, /index\.vue$/)
    AllFiles.keys().forEach(file => {
      const Component = AllFiles(file).default
      // file.split('/')[1] 文件夹名=====组件名
      app.component(file.split('/')[1], Component)
    })
  }
}
