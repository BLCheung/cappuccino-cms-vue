import HttpKit  from '@/kit/http-kit';
import CUserApi from '@/api/cuser';

export default class CUserModel {
  
  /**
   * 获取C端用户分页
   * @param queryCUserDTO
   * @return {AxiosPromise}
   */
  static getCUsers(queryCUserDTO = {}) { return HttpKit.GET(CUserApi.USERS, queryCUserDTO); }
  
  /**
   * 获取C端用户的详情
   * @param id
   * @return {AxiosPromise}
   */
  static getCUser(id = '') { return HttpKit.GET(CUserApi.USER.replace('{id}', id)); }
}
