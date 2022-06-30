export default {
  namespaced: true,
  state: () => ({
    isCollapse: false
  }),
  mutations: {
    // 设置是否折叠菜单
    setIsCollapse(state, data) {
      state.isCollapse = data
    }
  },
  actions: {}
}
