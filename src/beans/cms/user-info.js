import UserLevel  from '@/common/enum/user-level';
import UserEntity from '@/beans/cms/user';

/**
 * 用户信息实体
 */
export default class UserInfoEntity extends UserEntity {
  
  userLevel = UserLevel.Guest;
  
  constructor(data) {
    super(data);
    this.userLevel = data.userLevel;
  }
}
