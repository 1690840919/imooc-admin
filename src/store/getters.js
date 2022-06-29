const getters = {
  token: state => state.user.token,
  role: state => state.user.userInfo.role,
  addRoutes: state => state.permission.addRoutes
}

export default getters
