export default {
  path: '/userManage',
  name: 'userManage',
  component: () => import('@/views/layout/index.vue'),
  meta: {
    roles: ['super-admin', 'admin']
  },
  children: [
    {
      path: '/userManage',
      component: () => import('@/views/userManage/index.vue'),
      meta: {
        title: '用户管理',
        roles: ['super-admin', 'admin'],
        icon: 'user'
      }
    }
  ]
}
