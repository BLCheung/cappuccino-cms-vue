import UserLevel from '@/common/enum/user-level';

const Config = {
  apiVersion:       'v1/',
  // API的baseURL
  baseURL:          process.env.VUE_APP_BASE_URL,
  // 默认打开的路由
  defaultRoute:     '/',
  // 默认的用户权限等级
  defaultUserLevel: UserLevel.Guest,
}

export default Config;
