// 账户管理 路由
const statementRouter = [
  {
    path: '/base/mock',
    name: 'base/mock',
    component: () => import('@/views/base/mock/index.vue'),
    meta: {
      title: 'mock数据',
      activePath: '/base/mock'
    }
  },
  {
    path: '/base/table',
    name: 'mock',
    component: () => import('@/views/base/table/index.vue'),
    meta: {
      title: '表格组件演示',
      activePath: '/base/table'
    }
  }
]

export default statementRouter
