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
