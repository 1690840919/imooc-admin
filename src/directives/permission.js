import store from '@/store'

function checkPermission(el, binding) {
  // 获取对应的权限
  const { value } = binding
  // 获取当前用户的所有权限
  const UserPermission = store.getters.role
  // value必须是一个数组
  if (value && value instanceof Array) {
    // 检测用户的权限是否包含了功能对应的权限
    // const hasPermission = UserPermission.some(permission => {
    //   return value.includes(permission)
    // })
    const hasPermission = value.includes(UserPermission)
    // 如果用户不存在功能对应权限
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin","super-admin",....]')
  }
}

export default {
  // 在绑定元素的父组件被挂载之后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的VNode及其子组件的VNode更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
