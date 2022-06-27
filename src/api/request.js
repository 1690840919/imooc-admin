import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store/index.js'
import router from '@/router/index.js'
import request from '@/api/request.js'
import { isCheckTokenTimeout } from '@/utils/auth.js'
// 是否正在刷新token
let isRefreshToken = false
// 存储401发出的请求
let requestList = []
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 请求前，获取用户信息
  const { userInfo, token } = store.state.user
  // 用户信息存在，已经登陆。添加token
  if (userInfo && token) {
    config.headers.Authorization = token
    if (isCheckTokenTimeout()) {
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 过期'))
    }
  }
  return config
}, error => {
  // console.log('请求前出错', error)
  ElMessage.error(error.message)
  return Promise.reject(new Error(error.message))
})
// 响应拦截器
service.interceptors.response.use(response => {
  // 状态码2xx都会进入这里
  // console.log('response', response.status)
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, async error => {
  // 状态超出2xx进入这里
  // console.log('请求后出错', error)
  if (error.response) { // 请求收到响应，状态码超出2xx
    // 获取当前的状态码
    const { status } = error.response
    // 对应的状态码处理
    if (status === 400) {
      ElMessage.error('请求参数错误')
    } else if (status === 401) {
      ElMessage.error('Token无效、过期，请重新登陆')
      // 1、不存在token，直接跳转登陆页
      const { token, refreshToken } = store.state.user
      if (!token) {
        router.push({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        return Promise.reject(new Error(error.message))
      }
      // 2、存在token，进行刷新token
      if (!isRefreshToken) {
        isRefreshToken = true
        await axios.create()({
          method: 'POST',
          url: 'http://localhost:7000/api',
          data: {
            refreshToken
          }
        })
          .then(data => {
            // console.log('刷新token成功')
            // 刷新token成功,保存新的token
            store.commit('/user/setToken', data.token)
            // 重发数组存起来的请求
            requestList.forEach(cb => cb())
            // 清空请求数组
            requestList = []
            // 重发当次请求
            return request(error.config)
          })
          .catch(() => {
            // 刷新token失败，跳转登录页
            router.push({
              name: 'login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
            // 清除原有的信息
            store.commit('/user/setUserInfo', null)
            store.commit('/user/setToken', null)
            // console.log('刷新token失败')
            return Promise.reject(new Error(error.message))
          })
          .finally(() => {
            isRefreshToken = false
          })
      }
      // 刷新状态下，把请求挂起，存放数组中
      return new Promise(resolve => {
        requestList.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      ElMessage.error('权限不足，请联系管理员')
    } else if (status === 404) {
      ElMessage.error('请求资源不存在')
    } else if (status >= 500) {
      ElMessage.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求没有收到响应
    ElMessage.error('请求超时，请重试！')
  } else { // 请求发生错误
    ElMessage.error(`请求失败：${error.message}`)
  }
  return Promise.reject(new Error(error.message))
})

export default service
