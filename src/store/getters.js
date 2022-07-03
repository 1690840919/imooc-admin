const getters = {
  token: state => state.user.token,
  role: state => state.user.userInfo.role,
  addRoutes: state => state.permission.addRoutes,
  isCollapse: state => state.layout.isCollapse,
  language: state => state.layout.language,
  themeColor: state => state.layout.themeColor
}

export default getters
