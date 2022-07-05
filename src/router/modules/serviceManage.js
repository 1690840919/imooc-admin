export default {
  path: '/serviceManage',
  name: 'serviceManage',
  component: () => import('@/views/layout/index.vue'),
  meta: {
    title: '服务管理',
    roles: ['super-admin', 'admin'],
    icon: 'school'
  },
  children: [
    {
      path: '',
      redirect: '/serviceManage/articleManage',
      meta: {
        title: '文章管理',
        roles: ['super-admin', 'admin']
      },
      hidden: true
    },
    {
      path: '/serviceManage/roleManage',
      component: () => import('@/views/articleManage/index.vue'),
      meta: {
        title: '文章管理',
        roles: ['super-admin', 'admin'],
        icon: 'tickets'
      }
    },
    {
      path: '/serviceManage/goodsManage',
      component: () => import('@/views/goodsManage/index.vue'),
      meta: {
        title: '商品管理',
        roles: ['super-admin', 'admin'],
        icon: 'goods'
      }
    },
    {
      path: '/serviceManage/courseManage',
      component: () => import('@/views/courseManage/index.vue'),
      meta: {
        title: '课程管理',
        roles: ['super-admin', 'admin'],
        icon: 'notebook'
      }
    }
  ]
}
