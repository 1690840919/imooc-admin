import router from '@/router/index.js'

// 筛选出有权限的路由
export function filterUserRoutes(routes, role) {
  const result = []
  routes.forEach(item => {
    if (item.meta.roles.includes(role)) {
      const route = { ...item }
      if (item.children) {
        route.children = filterUserRoutes(item.children, role)
      }
      result.push(route)
    }
  })
  return result
}

// 配置路由
export function setUserRoutes(routes) {
  routes.forEach(route => {
    router.addRoute(route)
    console.log(`正在配置路由${route.path}`)
  })
  console.log('配置路由成功')
}

// 路由表转化为菜单
export function getUserMenus(routes, role) {
  const result = []
  routes.forEach(item => {
    if (item.hidden) return
    if (item.meta && item.meta.roles && !item.meta.roles.includes(role)) return
    let obj
    if ((!item.meta || !item.meta.title) && item.children) {
      obj = getUserMenus(item.children, role)[0]
    } else {
      obj = {
        id: item.path,
        menuName: item.meta.title,
        menuRouter: item.path,
        menuIcon: item.meta.icon
      }
      if (item.children) {
        obj.children = getUserMenus(item.children, role)
      }
    }
    obj && result.push(obj)
  })
  return result
}
