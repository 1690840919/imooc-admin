export default {
  path: '/permissionManage',
  name: 'permissionManage',
  component: () => import('@/views/layout/index.vue'),
  meta: {
    title: '权限管理',
    roles: ['super-admin', 'admin'],
    icon: 'setting'
  },
  children: [
    {
      path: '',
      redirect: '/permissionManage/roleManage',
      meta: {
        title: '角色管理',
        roles: ['super-admin', 'admin']
      },
      hidden: true
    },
    {
      path: '/permissionManage/roleManage',
      component: () => import('@/views/roleManage/index.vue'),
      meta: {
        title: '角色管理',
        roles: ['super-admin', 'admin'],
        icon: 'user'
      }
    },
    {
      path: '/permissionManage/menuManage',
      component: () => import('@/views/menuManage/index.vue'),
      meta: {
        title: '菜单管理',
        roles: ['super-admin', 'admin'],
        icon: 'menu'
      }
    },
    {
      path: '/permissionManage/resourceManage',
      component: () => import('@/views/resourceManage/index.vue'),
      meta: {
        title: '资源管理',
        roles: ['super-admin'],
        icon: 'folder'
      }
    }
  ]
}
