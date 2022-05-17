import router from '@/router';

export default class BaseRouter {
  
  /**
   * 到首页
   * @param replace 是否执行重定向
   */
  static nav2Home(replace = false) {
    router.push({ path: '/', replace });
  }
}
