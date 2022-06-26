import { userLogin } from '@/api/user.js'
import { setItem, getItem } from '@/utils/storage.js'
import router from '@/router/index.js'
import { ElMessage } from 'element-plus'

export default {
  namespaced: true,
  state: () => ({
    userInfo: getItem('imooc-admin-userInfo'),
    token: getItem('imooc-admin-token')
  }),
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
      setItem('imooc-admin-userInfo', data)
    },
    setToken(state, data) {
      state.token = data
      setItem('imooc-admin-token', data)
    }
  },
  actions: {
    login(store, data) {
      const { username, password, redirect } = data
      return new Promise((resolve, reject) => {
        userLogin({
          username,
          // 按道理需要加密再传输
          password
        }).then(res => {
          const token = res.token
          const userInfo = res.userInfo
          store.commit('setUserInfo', userInfo)
          store.commit('setToken', token)
          router.push(redirect || '/')
          ElMessage.success('登陆成功')
          resolve()
        })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
