// 格式校验
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
      // 如果匹配到不是数字
    } else if (/\D/.exec(value)) {
      callback(new Error('密码必须是数字'))
    } else {
      callback()
    }
  }
}

// 校验是不是外部资源
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
