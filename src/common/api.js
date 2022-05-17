/**
 * 封装的api或内置的api
 */
export default class Api {
  
  /**
   * 断言函数
   * @param condition
   * @param msg
   */
  static assert(condition, msg = '') {
    !condition && console.error(msg);
  }
}
