export const getUserMenuRoutes = (list = []) => {
  const result = []
  if (!list || !list.length) return []
  list.length && list.forEach(item => {
    const route = {
      path: item.menuRouter,
      name: item.menuRouter,
      meta: {
        title: item.menuName
      },
      component: () => require(`@/views/${item.menuRouter}/index.vue`)
    }
    result.push(route)
    if (item.children) {
      result.push(...getUserMenuRoutes(item.children))
    }
  })
  return result
}
