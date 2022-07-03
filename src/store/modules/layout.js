import { setItem, getItem } from '@/utils/storage.js'
import { LANGUAGE, THEME_COLOR } from '@/constant/index.js'
export default {
  namespaced: true,
  state: () => ({
    isCollapse: false,
    language: getItem(LANGUAGE) || 'zh',
    themeColor: getItem(THEME_COLOR) || 'rgb(53, 59, 65)'
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
    }
  },
  actions: {}
}
