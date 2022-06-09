import CUserEntity from '@/beans/cuser';

export default class CUserInfoEntity extends CUserEntity {
  
  addressList = [];
  
  constructor(data) {
    super(data);
    this.addressList = data.addressList;
  }
}
