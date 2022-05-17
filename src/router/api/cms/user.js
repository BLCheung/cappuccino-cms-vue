import router from '@/router';

export default class UserRouter {
  
  static CMS_USER_PREFIX = '/cms/user/';
  
  /**
   * 到个人中心
   */
  static nav2User() {
    router.push({ path: `${ this.CMS_USER_PREFIX }` });
  }
}
