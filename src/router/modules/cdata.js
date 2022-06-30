import Layout    from '@/layout';
import UserLevel from '@/common/enum/user-level';

/**
 * C端数据路由模块
 */
const CDataRouter = {
  name:       'CData',
  path:       '/cdata',
  redirect:   '/',
  component:  Layout,
  alwaysShow: true,
  meta:       {
    title:      'C端数据管理', icon: 'user',
    // 当前不需要展示在面包屑
    breadcrumb: false,
  },
  children:   [
    {
      name:      'CDataUsers',
      path:      'users',
      component: () => import('@/views/cdata/users/list/index'),
      meta:      { title: 'C端用户管理', icon: 'user', level: UserLevel.User, permission: [ '查询所有C端用户' ] },
    },
    {
      name:      'CDataOrders',
      path:      'orders',
      component: () => import('@/views/cdata/orders/list/index'),
      meta:      { title: 'C端订单管理', icon: 'el-icon-s-order', level: UserLevel.User, permission: [ '查询所有订单' ] },
    },
  ],
}

export default CDataRouter;
