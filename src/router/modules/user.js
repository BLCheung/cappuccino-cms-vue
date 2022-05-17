import Layout from '@/layout';

/**
 * 用户路由模块
 */
const CMSUserRouter = {
  path:      '/cms/user',
  redirect:  '/cms/user',
  component: Layout,
  hidden:    true,
  children:  [
    {
      name:      'CMSUser',
      path:      '/',
      component: () => import('@/views/cms/user/index'),
      meta:      { title: '个人中心', icon: 'user', cache: false },
    },
  ],
}

export default CMSUserRouter;
