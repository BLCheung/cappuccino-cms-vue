import router       from './router'
import store        from './store'
import { Message }  from 'element-ui'
import NProgress    from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import Config       from '@/config/config';

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单路由，无需登录
const whiteList = [ '/login' ] // no redirect whitelist

/**
 * 判断当前用户是否具有当前路由所指定的权限
 * @param to
 * @param user
 * @param userPermissions
 * @return {boolean}
 */
const hasPermission = (to, user, userPermissions = []) => {
  const { userLevel } = user;
  const {
          level      = Config.defaultUserLevel,
          permission = [],
        }             = to.meta;
  // 用户等级高，直接通过（userLevel值越小，等级也高）
  if (userLevel < level) return true;
  // 否则必须判断是否具有相应权限
  if (permission.length === 0) return true;
  return permission.some(p => userPermissions.indexOf(p) > -1);
}

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);
  
  const isUserLogin = store.getters['user/isUserLogin'];
  
  // 未登录
  if (!isUserLogin) {
    // 白名单内路由，直接跳转
    if (whiteList.indexOf(to.path) > -1) {
      next();
      NProgress.done();
    } else {
      // 到登录页，并传入当前目标路由进去
      Message('请先登录!');
      next({ path: '/login', query: { redirect: to.path } });
      NProgress.done();
    }
    return;
  }
  
  // 已登录状态下登录页重定向到主页
  if (to.path === '/login') {
    next({ path: '/' });
    NProgress.done();
  } else {
    const user        = store.getters['user/userInfo'];
    const permissions = store.getters['permission/permissions'];
    // 是否具有目标页面指定的路由权限
    if (hasPermission(to, user, permissions)) {
      console.log('有权限');
      next();
      NProgress.done();
    } else {
      console.log('无权限');
      next({ path: '/401' });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
});
