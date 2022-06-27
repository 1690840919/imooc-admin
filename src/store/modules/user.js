import { userLogin } from '@/api/user.js'
import { setItem, getItem } from '@/utils/storage.js'
import router from '@/router/index.js'
import { ElMessage } from 'element-plus'
import { IMOOC_ADMIN_USERINFO, IMOOC_ADMIN_TOKEN } from '@/constant/index.js'
import { setStartLoginTimeStamp } from '@/utils/auth.js'
export default {
  namespaced: true,
  state: () => ({
    userInfo: getItem(IMOOC_ADMIN_USERINFO),
    token: getItem(IMOOC_ADMIN_TOKEN)
  }),
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
      setItem(IMOOC_ADMIN_USERINFO, data)
    },
    setToken(state, data) {
      state.token = data
      setItem(IMOOC_ADMIN_TOKEN, data)
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
          // 缓存开始登陆的时间
          setStartLoginTimeStamp()
          ElMessage.success('登陆成功')
          resolve()
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout(store, data) {
      store.commit('setUserInfo', null)
      store.commit('setToken', null)
      router.push('/login')
    }
  }
}
