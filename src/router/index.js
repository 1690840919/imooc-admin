import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
// 白名单
const whiteList = ['/login']
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/layout/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫导航
router.beforeEach((to, from, next) => {
  // 已经登陆
  if (store.getters.token) {
    // 已经登陆的不能进入登陆页面
    if (to.path === '/login') {
      next('/')
    } else {
      // 已经登陆，直接进入页面
      next()
    }
  } else {
    // 用户未登录,但是存在白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      // 用户未登录,不存在白名单,跳到登陆页
      next({
        name: 'login',
        query: { // 通过url传递参数
          redirect: to.fullPath // 把原来需要访问的网页，告诉登陆页面
        }
      })
    }
  }
})
export default router
