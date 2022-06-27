import { userLogin } from '@/api/user.js'
import { setItem, getItem } from '@/utils/storage.js'
import router from '@/router/index.js'
import { ElMessage } from 'element-plus'
import { IMOOC_ADMIN_USERINFO, IMOOC_ADMIN_TOKEN, IMOOC_ADMIN_MENUS } from '@/constant/index.js'
import { setStartLoginTimeStamp } from '@/utils/auth.js'
export default {
  namespaced: true,
  state: () => ({
    userInfo: getItem(IMOOC_ADMIN_USERINFO),
    token: getItem(IMOOC_ADMIN_TOKEN),
    menus: getItem(IMOOC_ADMIN_MENUS)
  }),
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
      setItem(IMOOC_ADMIN_USERINFO, data)
    },
    setToken(state, data) {
      state.token = data
      setItem(IMOOC_ADMIN_TOKEN, data)
    },
    setMenus(state, data) {
      state.menus = data
      setItem(IMOOC_ADMIN_MENUS, data)
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
          const { token, userInfo, menus } = res
          store.commit('setUserInfo', userInfo)
          store.commit('setToken', token)
          store.commit('setMenus', menus)
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
