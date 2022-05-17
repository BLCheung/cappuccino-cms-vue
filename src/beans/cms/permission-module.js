import CommonUtils      from '@/utils/common';
import PermissionEntity from '@/beans/cms/permission';

export default class PermissionModuleEntity {
  module      = '';
  permissions = [];
  
  constructor(item) {
    this.module      = item.module;
    this.permissions = CommonUtils.transformList(item.permissions, PermissionEntity);
  }
}
