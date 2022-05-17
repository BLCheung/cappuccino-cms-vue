import CommonUtils from '@/utils/common';

/**
 * 用户实体
 */
export default class UserEntity {
  id       = null;
  username = '';
  nickname = '';
  avatar   = '';
  email    = '';
  
  constructor(data) {
    CommonUtils.copyIfExist(data, this);
  }
  
}
