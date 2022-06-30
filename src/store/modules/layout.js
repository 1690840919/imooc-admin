import { setItem, getItem } from '@/utils/storage.js'
import { LANGUAGE } from '@/constant/index.js'
export default {
  namespaced: true,
  state: () => ({
    isCollapse: false,
    language: getItem(LANGUAGE) || 'zh'
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
    }
  },
  actions: {}
}
