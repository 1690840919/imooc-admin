import { setItem, getItem } from '@/utils/storage.js'
import { LANGUAGE, THEME_COLOR } from '@/constant/index.js'
import router from '@/router/index.js'
export default {
  namespaced: true,
  state: () => ({
    isCollapse: false,
    language: getItem(LANGUAGE) || 'zh',
    themeColor: getItem(THEME_COLOR) || 'rgb(53, 59, 65)',
    routeTags: [],
    currentTagIndex: 0
  }),
  mutations: {
    // 设置是否折叠菜单
    setIsCollapse(state, data) {
      state.isCollapse = data
    },
    // 设置语言
    setLanguage(state, data) {
      state.language = data
      setItem(LANGUAGE, data)
    },
    // 设置主题色
    setThemeColor(state, data) {
      state.themeColor = data
      setItem(THEME_COLOR, data)
    },
    // 设置路由tags
    addRouteTag(state, tag) {
      const result = state.routeTags.findIndex(item => {
        return item.path === tag.path
      })
      if (result === -1) {
        state.routeTags.push(tag)
        state.currentTagIndex = state.routeTags.length - 1
      } else {
        state.currentTagIndex = result
      }
    },
    // 删除路由tags
    delRouteTag(state, index) {
      state.routeTags.splice(index, 1)
      // 删除的不是当前点亮的route
      if (index !== state.currentTagIndex) {
        if (index < state.currentTagIndex) {
          state.currentTagIndex = state.currentTagIndex - 1
        }
        return
      }
      state.currentTagIndex = state.routeTags.length - 1
      if (state.currentTagIndex >= 0) {
        router.push(state.routeTags[state.currentTagIndex].path)
      } else {
        router.push('/personal')
      }
    },
    // 设置当前tag的index
    setCurrentTagIndex(state, index) {
      state.currentTagIndex = index
    },
    // 点击刷新、关闭所有，关闭其他
    setMenuUpdateRouteTag(state, { type, index }) {
      if (type === 'refresh') {
        // 并没有刷新效果
        router.push(state.routeTags[index].path)
      } else if (type === 'closeOther') {
        const tag = state.routeTags[index]
        state.routeTags = [tag]
        state.currentTagIndex = 0
        router.push(tag.path)
      } else if (type === 'closeAll') {
        state.routeTags = []
        state.currentTagIndex = 0
        // 跳到默认个人中心
        router.push('/personal')
      }
    }
  },
  actions: {}
}
