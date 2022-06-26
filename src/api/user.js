import request from './request'

// 用户登陆
export const userLogin = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}
