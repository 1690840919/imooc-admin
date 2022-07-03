const getters = {
  token: state => state.user.token,
  role: state => state.user.userInfo.role,
  addRoutes: state => state.permission.addRoutes,
  isCollapse: state => state.layout.isCollapse,
  language: state => state.layout.language,
  themeColor: state => state.layout.themeColor,
  routeTags: state => state.layout.routeTags,
  currentTagIndex: state => state.layout.currentTagIndex
}

export default getters
