/** 部门管理路由 */

/* 引入 Layout */
import Layout from '@/layout'

export const departmentRouter = {
  path: '/department',
  component: Layout, // 一级路由
  children: [
    {
      path: '', // 二级路由地址为空时，表示二级路由的默认路由地址
      name: 'department', // 可以用来跳转，也可以用来标记路由
      component: () => import('@/views/department/index'), // 按需引入
      meta: {
        // 路由元信息
        title: '组织', // 标题
        icon: 'tree' // 图标
      }
    }]
}
