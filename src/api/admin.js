import Config from '@/config/config';

const prefix = `${ Config.apiVersion }cms/admin`;

const AdminApi = {
  // 获取所有用户
  USERS:               `${ prefix }/users`,
  // 删除用户
  DELETE_USER:         `${ prefix }/user/{id}`,
  // 更改用户密码
  RESET_USER_PASSWORD: `${ prefix }/user/{id}/password`,
  // 分配用户分组
  DISPATCH_GROUPS:     `${ prefix }/user/{id}/group`,
  
  // 获取所有可分配的分组
  GROUPS:       `${ prefix }/group/all`,
  // 获取一个分组及其权限
  GROUP:        `${ prefix }/group/{id}`,
  // 创建分组
  CREATE_GROUP: `${ prefix }/group`,
  // 更新分组
  UPDATE_GROUP: `${ prefix }/group/{id}`,
  // 删除分组
  DELETE_GROUP: `${ prefix }/group/{id}`,
  
  // 获取所有可分配的权限
  PERMISSIONS:          `${ prefix }/permissions`,
  // 分组分配权限
  DISPATCH_PERMISSIONS: `${ prefix }/permissions/dispatch`,
}

export default AdminApi;
