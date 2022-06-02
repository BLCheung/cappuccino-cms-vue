import UserApi from '@/api/cms/user';
import HttpKit from '@/kit/http-kit';

export default class UserModel {
  
  /**
   * 注册用户
   * @param registerUserDTO
   * @return {AxiosPromise}
   */
  static register(registerUserDTO = {}) {
    return HttpKit.POST(UserApi.REGISTER, registerUserDTO,
      { handleSuccessTips: true });
  }
  
  /**
   * 登录
   * @param loginDTO
   * @return {AxiosPromise}
   */
  static login(loginDTO = {}) { return HttpKit.POST(UserApi.LOGIN, loginDTO); }
  
  /**
   * 更新用户信息
   * @param userInfoDTO
   * @return {AxiosPromise}
   */
  static update(userInfoDTO = {}) { return HttpKit.PUT(UserApi.USER_INFO, userInfoDTO); }
  
  /**
   * 修改密码
   * @param passwordDTO
   * @return {AxiosPromise}
   */
  static updatePassword(passwordDTO = {}) { return HttpKit.PUT(UserApi.PASSWORD, passwordDTO); }
  
  /**
   * 获取用户信息和权限
   * @return {AxiosPromise}
   */
  static getUserInfoAndPermissions() { return HttpKit.GET(UserApi.PERMISSIONS); }
}
