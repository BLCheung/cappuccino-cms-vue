const Code = {
  OK:                    0,
  // 创建成功
  CREATED:               1,
  // 更新成功
  UPDATED:               2,
  // 删除成功
  DELETED:               3,
  // 服务器未知异常
  SERVER_ERROR:          9999,
  // 未授权
  UNAUTHORIZED:          10001,
  // 令牌不存在
  TOKEN_EMPTY:           10009,
  // 默认的令牌失效
  TOKEN_INVALID:         10010,
  // 默认的令牌过期
  TOKEN_EXPIRED:         10011,
  // access token失效
  ACCESS_TOKEN_INVALID:  10012,
  // access token过期
  ACCESS_TOKEN_EXPIRED:  10013,
  // refresh token 无效
  REFRESH_TOKEN_INVALID: 10014,
  // refresh token 过期
  REFRESH_TOKEN_EXPIRED: 10015,
}

export default Code;
