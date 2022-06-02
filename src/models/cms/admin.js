import AdminApi from '@/api/cms/admin';
import HttpKit  from '@/kit/http-kit';

export default class AdminModel {
  
  /**
   * 获取所有用户
   * @param queryUserDTO
   * @return {AxiosPromise<any>}
   */
  static getUsers(queryUserDTO = {}) { return HttpKit.GET(AdminApi.USERS, queryUserDTO); }
  
  /**
   * 删除用户
   * @param userId
   * @return {AxiosPromise}
   */
  static deleteUser(userId = '') { return HttpKit.DELETE(AdminApi.DELETE_USER.replace('{id}', userId)); }
  
  /**
   * 重置用户密码
   * @param userId
   * @param resetUserPasswordDTO
   * @return {AxiosPromise}
   */
  static resetUserPassword(userId = '', resetUserPasswordDTO = {}) {
    return HttpKit.PUT(AdminApi.RESET_USER_PASSWORD.replace('{id}', userId), resetUserPasswordDTO);
  }
  
  /**
   * 获取所有可分配的分组
   * @return {AxiosPromise}
   */
  static getGroups() { return HttpKit.GET(AdminApi.GROUPS); }
  
  /**
   * 获取一个分组及其权限
   * @param groupId
   * @return {AxiosPromise}
   */
  static getGroup(groupId = '') { return HttpKit.GET(AdminApi.GROUP.replace('{id}', groupId)); }
  
  /**
   * 创建分组
   * @param createGroupDTO
   * @return {AxiosPromise}
   */
  static createGroup(createGroupDTO = {}) { return HttpKit.POST(AdminApi.CREATE_GROUP, createGroupDTO); }
  
  /**
   * 更新分组
   * @param groupId
   * @param updateGroupDTO
   * @return {AxiosPromise}
   */
  static updateGroup(groupId = '', updateGroupDTO = {}) {
    return HttpKit.PUT(AdminApi.UPDATE_GROUP.replace('{id}', groupId), updateGroupDTO);
  }
  
  /**
   * 删除分组
   * @param groupId
   * @return {AxiosPromise}
   */
  static deleteGroup(groupId = '') {
    return HttpKit.DELETE(AdminApi.DELETE_GROUP.replace('{id}', groupId), {}, {}, {
      handleSuccessTips: true,
    });
  }
  
  /**
   * 分配用户分组
   * @param userId
   * @param updateUserGroupDTO
   * @return {AxiosPromise}
   */
  static dispatchGroups(userId = '', updateUserGroupDTO = {}) {
    return HttpKit.PUT(AdminApi.DISPATCH_GROUPS.replace('{id}', userId), updateUserGroupDTO);
  }
  
  /**
   * 获取可分配的分组权限
   * @return {AxiosPromise}
   */
  static getPermissions() { return HttpKit.GET(AdminApi.PERMISSIONS); }
  
  /**
   * 分组分配权限
   * @param dispatchPermissionsDTO
   * @return {AxiosPromise}
   */
  static dispatchPermissions(dispatchPermissionsDTO = {}) {
    return HttpKit.PUT(AdminApi.DISPATCH_PERMISSIONS, dispatchPermissionsDTO);
  }
}
