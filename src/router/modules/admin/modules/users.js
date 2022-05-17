import { AppMain } from '@/layout/components';
import UserLevel   from '@/common/enum/user-level';

const CMSAdminUsersRouter = {
  name:       'CMSAdminUsers',
  path:       '/cms/admin/users',
  redirect: '/cms/admin/users/list',
  component:  AppMain,
  // 总是展示该跟路由，否则子路由只有一个时会被隐藏
  alwaysShow: true,
  meta:       {
    title:      '用户管理', icon: 'user',
    // 当前不需要展示在面包屑
    breadcrumb: false,
  },
  children:   [
    {
      name:      'CMSAdminUsersList',
      path:      'list',
      component: () => import('@/views/cms/admin/users/list/index'),
      meta:      { title: '用户列表', icon: 'user', level: UserLevel.Admin },
    },
    {
      name:      'CMSAdminUsersRegister',
      path:      'register',
      component: () => import('@/views/cms/admin/users/register/index'),
      meta:      { title: '注册用户', icon: 'el-icon-circle-plus', level: UserLevel.Admin },
    },
  ],
}

export default CMSAdminUsersRouter;
