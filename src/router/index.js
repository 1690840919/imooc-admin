import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import permissionManage from './modules/permissionManage'
import userManage from './modules/userManage'
import { setUserRoutes } from '@/utils/permission.js'
// import { getUserMenuRoutes } from '@/utils/routes.js'
// 白名单
const whiteList = ['/login']
// 首次进入，必须加载路由
let startAddRoutes = true
// 公共路由
export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/layout/index.vue'),
    meta: {
    },
    children: [
      {
        path: '',
        redirect: '/personal',
        hidden: true
      },
      {
        path: '/personal',
        name: 'personal',
        component: () => import('@/views/personal/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'platform'
        }
      }
    ]
  }
  // 空路由必须放在最后
  // {
  //   path: '/:pathMatch(.*)',
  //   name: '404',
  //   component: () => import('@/views/404/index.vue')
  // }
]
// 私有路由
export const privateRoutes = [
  userManage,
  permissionManage
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
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
      // 如果没有配置路由或者首次进入必须加载路由
      if (!store.state.permission.addRoutes || startAddRoutes) {
        startAddRoutes = false
        console.log('登陆成功/刷新了，需要配置路由')
        store.dispatch('permission/getUserRoutes', store.getters.role).then(res => {
          // 配置路由
          setUserRoutes(res)
          // 中断本次跳转，开启下一次重新跳转，以便于上面的配置新路由
          next({ ...to, replace: true })
        })
      } else {
        next()
      }
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
