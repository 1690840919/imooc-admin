const getters = {
  token: state => state.user.token,
  role: state => state.user.userInfo.role,
  addRoutes: state => state.permission.addRoutes,
  isCollapse: state => state.layout.isCollapse
}

export default getters
