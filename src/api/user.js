import Config from '@/config/config';

const prefix = `${ Config.apiVersion }cms/user`;

const UserApi = {
  // 注册用户
  REGISTER:    `${ prefix }/register`,
  // 登录
  LOGIN:       `${ prefix }/login`,
  // 更新用户信息
  USER_INFO:   `${ prefix }`,
  // 修改密码
  PASSWORD:    `${ prefix }/password`,
  // 获取刷新令牌
  REFRESH:     `${ prefix }/refresh`,
  // 获取用户信息以及权限
  PERMISSIONS: `${ prefix }/permissions`,
}

export default UserApi;
