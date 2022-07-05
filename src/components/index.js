import Dialog from './dialog'
import Page from './page'

const components = [
  Dialog,
  Page
]

export default {
  install(app) {
    components.forEach(item => {
      app.use(item)
    })
  }
}
