import Code from '@/common/constant/code';

export default class ResultKit {
  
  constructor(code = Code.SERVER_ERROR, msg, data) {
    this.code = code;
    this.msg  = msg;
    this.data = data;
    this.ok   = Code.SERVER_ERROR > this.code;
  }
  
  static setResult(res) {
    const { code, msg, data } = res.data;
    return new ResultKit(code, msg, data);
  }
  
  static resolveOK(msg = '', data = null) {
    return new ResultKit(Code.OK, msg, data);
  }
  
  static resolveFailed(msg = '', data = null) {
    return new ResultKit(Code.SERVER_ERROR, msg, data);
  }
  
  isOK() {
    return this.ok;
  }
}
