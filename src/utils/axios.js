import axios                   from 'axios'
import { Message, MessageBox } from 'element-ui'
import store                   from '@/store'
import Config                  from '@/config/config';
import TokenKit                from '@/kit/token-kit';
import ResultKit               from '@/kit/result-kit';
import Api                     from '@/common/api';
import HttpMethods             from '@/common/enum/http-methods';
import UserApi                 from '@/api/cms/user';
import Code                    from '@/common/constant/code';
import router                  from '@/router';

// create an axios instance
const service = axios.create({
  baseURL:           Config.baseURL,      // url = base url + request url
  withCredentials:   false,               // send cookies when cross-domain requests
  timeout:           10000,               // request timeout
  handleSuccessTips: false,               // 默认是否处理成功的消息
  handleFailedTips:  true,                // 默认是否处理失败的消息
  validateStatus(statusCode) {  // 校验可通过response的Promise的状态码
    return 200 <= statusCode && statusCode <= 500;
  },
});

/**
 * 登录相关异常错误码，
 * 令牌过期，需要执行重新登录操作
 * @param code
 * @return {boolean}
 */
const isAccessTokenExpired = (code) => {
  const errorCodes = [
    Code.TOKEN_EXPIRED,
    Code.ACCESS_TOKEN_EXPIRED,
  ];
  return errorCodes.includes(code);
}

/**
 * 登录相关异常错误码，
 * 令牌损坏或refreshToken失效，需要执行登出操作
 * @param code
 * @return {boolean}
 */
const isTokenInvalid = (code) => {
  const errorCodes = [
    Code.TOKEN_EMPTY,
    Code.TOKEN_INVALID,
    Code.ACCESS_TOKEN_INVALID,
    Code.REFRESH_TOKEN_INVALID,
    Code.REFRESH_TOKEN_EXPIRED,
  ];
  return errorCodes.includes(code);
}

/**
 * 重定向页面
 */
const redirectPage = () => {
  // const { origin }     = window.location;
  // window.location.href = origin;
  const currentPath = router.currentRoute.path;
  if (currentPath !== '/login') {
    router.replace({ path: '/login', query: { redirect: currentPath } });
  }
}

/**
 * 检查Http方法进行容错处理
 * @param requestConfig
 */
const validateMethods = (requestConfig = {}) => {
  const method = requestConfig.method.toUpperCase();
  switch (method) {
    case HttpMethods.GET:
      !requestConfig.params && (requestConfig.params = requestConfig.data || {});
      break;
    case HttpMethods.POST:
      !requestConfig.data && (requestConfig.data = requestConfig.params || {});
      checkHasFileData(requestConfig);
      break;
    
    default:
      break;
  }
}

/**
 * 检测data是否包含文件类型的数据
 * @param requestConfig
 */
const checkHasFileData = (requestConfig = {}) => {
  let hasFile = false;
  const data  = requestConfig.data;
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (typeof value === 'object') {
      hasFile = value instanceof File
        || value instanceof FileList
        || value instanceof Blob;
    }
  });
  // 把data用FormData包装
  if (hasFile) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    requestConfig.data = formData;
  }
}

/**
 * 拼装token到请求头
 * @param requestConfig
 */
const assembleAuthorization = (requestConfig = {}) => {
  const url = requestConfig.url;
  console.log('url:', url);
  if (UserApi.REFRESH === url) {
    const refreshToken = TokenKit.getToken(TokenKit.REFRESH_TOKEN);
    refreshToken && (requestConfig.headers['Authorization'] = refreshToken);
  } else {
    const accessToken = TokenKit.getToken(TokenKit.ACCESS_TOKEN);
    accessToken && (requestConfig.headers['Authorization'] = accessToken);
  }
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const requestConfig = { ...config };
    Api.assert(requestConfig.url, '请求需要设置url');
    
    validateMethods(requestConfig);
    assembleAuthorization(requestConfig);
    
    return requestConfig;
  },
  error => {
    // do something with request error
    console.error(error); // for debug
    return ResultKit.resolveFailed('网络开小差了~', null);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async response => {
    const { status, config, data } = response;
    const {
            handleSuccessTips = false,  // 是否处理成功的消息
            handleFailedTips  = true,   // 是否处理失败的消息
          }                        = config;
    
    
    if (status.toString().charAt(0) === '2') {
      if (handleSuccessTips) {
        Message({
          message:  data.msg || 'OK',
          type:     'success',
          duration: 3 * 1000,
        });
      }
      return ResultKit.setResult(response);
    }
    
    // 令牌无效或刷新令牌过期，做登出处理
    if (isTokenInvalid(data.code)) {
      console.warn('token失效');
      await store.dispatch('user/logout');
      redirectPage();
      MessageBox({
        title:            '提示',
        message:          '令牌已失效，请重新登录!',
        type:             'info',
        showClose:        false,
        showCancelButton: false,
      });
      return ResultKit.resolveFailed(data.msg);
    }
    // 令牌过期，重新登录
    if (isAccessTokenExpired(data.code)) {
      console.warn('token过期');
      const refreshRes = await service({ url: UserApi.REFRESH, method: HttpMethods.GET });
      if (!refreshRes.isOK()) {
        redirectPage();
        Message({ message: '令牌过期并且二次获取失败，请手动重新登录', type: 'error' });
        await store.dispatch('user/logout');
        return refreshRes;
      }
      store.commit('user/saveToken', refreshRes.data);
      // 将上次失败请求重发
      return service(config);
    }
    
    if (handleFailedTips) {
      Message({
        message:  data.msg || '未知错误',
        type:     'error',
        duration: 5 * 1000,
      });
    }
    
    return ResultKit.setResult(response);
  },
  error => {
    // 请求超时
    if (error.code === 'ECONNABORTED' || error.message.indexOf('timeout') !== -1) {
      Message({ message: '请求超时，请稍后重试!', type: 'error', duration: 5 * 1000 });
      return ResultKit.resolveFailed('请求超时，请稍后重试!');
    }
    
    if (error.response) {
      const res        = ResultKit.setResult(error.response);
      const { config } = error.response;
      if (config.handleFailedTips) {
        Message({ message: res.msg, type: 'error' });
      }
      return res;
    }
    
    console.log('没有response');
    Message({ message: '请检查网络或API是否正常!', type: 'error' });
    return ResultKit.resolveFailed('请检查网络或API是否正常!');
  },
);

export default service;
