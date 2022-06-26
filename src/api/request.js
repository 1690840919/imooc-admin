import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store/index.js'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  const { userInfo, token } = store.state.user
  console.log(userInfo)
  console.log(token)
  if (userInfo && token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  ElMessage.error(error.message)
  return Promise.reject(new Error(error.message))
})
// 响应拦截器
service.interceptors.response.use(response => {
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  ElMessage.error(error.message)
  return Promise.reject(new Error(error.message))
})

export default service
