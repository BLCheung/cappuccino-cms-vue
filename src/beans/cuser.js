import CommonUtils from '@/utils/common';

/**
 * C端用户实体
 */
export default class CUserEntity {
  
  id        = '';
  openid    = '';
  nickname  = '';
  unifyUid  = '';
  email     = '';
  password  = '';
  mobile    = '';
  wxProfile = null;
  
  constructor(item) {
    CommonUtils.copy(item, this);
  }
  
}
