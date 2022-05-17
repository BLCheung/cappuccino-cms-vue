import { AppMain } from '@/layout/components';
import UserLevel   from '@/common/enum/user-level';

const CMSAdminGroupsRouter = {
  name:       'CMSAdminGroups',
  path:       '/cms/admin/groups',
  redirect:   '/cms/admin/groups/list',
  component:  AppMain,
  alwaysShow: true,
  meta:       { title: '分组管理', icon: 'tree', breadcrumb: false },
  children:   [
    {
      path:      'list',
      name:      'CMSAdminGroupsList',
      component: () => import('@/views/cms/admin/groups/list/index'),
      meta:      { title: '分组列表', icon: 'tree', level: UserLevel.Admin },
    },
    {
      path:      'add',
      name:      'CMSAdminGroupsAdd',
      component: () => import('@/views/cms/admin/groups/add/index'),
      meta:      { title: '创建分组', icon: 'el-icon-circle-plus', level: UserLevel.Admin },
    },
  ],
}

export default CMSAdminGroupsRouter;
