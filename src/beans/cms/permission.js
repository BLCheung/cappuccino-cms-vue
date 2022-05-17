import CommonUtils from '@/utils/common';

export default class PermissionEntity {
  
  id     = '';
  module = '';
  name   = '';
  
  constructor(item) {
    CommonUtils.copy(item, this);
  }
  
}
