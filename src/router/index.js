import Vue            from 'vue';
import Router         from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout         from '@/layout';

/* Router Modules */
import BaseRouter     from '@/router/modules/base';
import ErrorRouter    from '@/router/modules/error';
import CMSUserRouter  from '@/router/modules/user';
import CMSAdminRouter from '@/router/modules/admin';
import UserLevel      from '@/common/enum/user-level';
import CDataRouter    from '@/router/modules/cdata';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    cache: false                 if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    level: UserLevel.User
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const routes = [
  ...BaseRouter,
  ...ErrorRouter,
  
  CMSUserRouter,
  CMSAdminRouter,
  CDataRouter,
  
  {
    path:      '/icon',
    component: Layout,
    children:  [
      {
        path:      'index',
        component: () => import('@/views/icons/index'),
        name:      'Icons',
        meta:      {
          title:      'Icons', icon: 'icon', cache: false,
          level:      UserLevel.Root,
          permission: [ '打开Icon' ],
        },
      },
    ],
  },
  
  {
    path:      '/theme',
    component: Layout,
    children:  [
      {
        path:      'index',
        component: () => import('@/views/theme/index'),
        name:      'Theme',
        meta:      { title: 'Theme', icon: 'theme', cache: false },
      },
    ],
  },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes,
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher  = newRouter.matcher // reset router
}

export default router
