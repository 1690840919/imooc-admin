import { setItem, getItem } from '@/utils/storage.js'
import { IMOOC_ADMIN_ADD_ROUTES } from '@/constant/index.js'
import router, { privateRoutes } from '@/router/index.js'
import { filterUserRoutes } from '@/utils/permission.js'
export default {
  namespaced: true,
  state: () => ({
    addRoutes: getItem(IMOOC_ADMIN_ADD_ROUTES)
  }),
  mutations: {
    setAddRoutes(state, data) {
      state.addRoutes = data
      setItem(IMOOC_ADMIN_ADD_ROUTES, data)
    }
  },
  actions: {
    getUserRoutes(store, role) {
      return new Promise((resolve, reject) => {
        const routes = filterUserRoutes(privateRoutes, role)
        // 最后添加空路由
        routes.push({
          path: '/:pathMatch(.*)',
          name: '404',
          component: () => import('@/views/404/index.vue')
        })
        store.commit('setAddRoutes', routes)
        resolve(routes)
      })
    },
    // 清空用户的路由
    removeUserRoutes(store) {
      store.state.addRoutes.forEach(route => {
        router.removeRoute(route)
        console.log(`正在删除路由${route.path}`)
      })
      // 清空本地addRoutes
      store.commit('setAddRoutes', null)
      console.log('路由删除完毕')
    }
  }
}
