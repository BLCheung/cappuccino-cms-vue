import Cookies from 'js-cookie';

export default class TokenKit {
  
  static ACCESS_TOKEN  = 'access-token';
  static REFRESH_TOKEN = 'refresh-token';
  
  constructor() {}
  
  static getToken(key) { return Cookies.get(key) || null; }
  
  static setTokens(accessToken, refreshToken) {
    Cookies.set(this.ACCESS_TOKEN, accessToken);
    Cookies.set(this.REFRESH_TOKEN, refreshToken);
  }
  
  static removeTokens() {
    Cookies.remove(this.ACCESS_TOKEN);
    Cookies.remove(this.REFRESH_TOKEN);
  }
}
