import Layout from '@/layout/index';

const BaseRouter = [
  {
    path:      '/redirect',
    component: Layout,
    hidden:    true,
    children:  [
      {
        path:      '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  
  {
    path:      '/login',
    name:      'Login',
    component: () => import('@/views/login/index'),
    hidden:    true,
  },
  
  {
    path:      '/',
    component: Layout,
    redirect:  '/home',
    children:  [
      {
        path:      'home',
        component: () => import('@/views/home/index'),
        name:      'Home',
        meta:      { title: '首页', icon: 'dashboard', affix: true, cache: true },
      },
    ],
  },
]

export default BaseRouter;
