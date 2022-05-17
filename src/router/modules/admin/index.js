import Layout               from '@/layout';
import CMSAdminUsersRouter  from '@/router/modules/admin/modules/users';
import CMSAdminGroupsRouter from '@/router/modules/admin/modules/groups';

const CMSAdminRouter = {
  name:       'CMSAdmin',
  path:       '/cms/admin',
  redirect:   '/',
  component:  Layout,
  alwaysShow: true,
  meta:       {
    title:      '管理员菜单', icon: 'user',
    // 当前不需要展示在面包屑
    breadcrumb: false,
  },
  children:   [
    CMSAdminUsersRouter,
    CMSAdminGroupsRouter,
  ],
}

export default CMSAdminRouter;
