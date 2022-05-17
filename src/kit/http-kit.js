import Request     from '@/utils/axios';
import HttpMethods from '@/common/enum/http-methods';

export default class HttpKit {
  
  static GET(url = '', params = {}, options = {}) {
    return Request({
      url,
      method: HttpMethods.GET,
      params,
      ...options,
    });
  }
  
  static POST(url = '', data = {}, options = {}) {
    return Request({
      url,
      method: HttpMethods.POST,
      data,
      ...options,
    });
  }
  
  static PUT(url = '', data = {}, params = {}, options = {}) {
    return Request({
      url,
      method: HttpMethods.PUT,
      data,
      params,
      ...options,
    });
  }
  
  static DELETE(url = '', data = {}, params = {}, options = {}) {
    return Request({
      url,
      method: HttpMethods.DELETE,
      data,
      params,
      ...options,
    });
  }
}
