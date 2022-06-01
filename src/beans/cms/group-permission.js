import GroupEntity            from '@/beans/cms/group';
import CommonUtils            from '@/utils/common';
import PermissionModuleEntity from '@/beans/cms/permission-module';

export default class GroupPermissionEntity extends GroupEntity {
  
  modules = [];
  
  constructor(data) {
    super(data);
    this.modules = CommonUtils.transformList(data.modules, PermissionModuleEntity);
  }
  
  getPermissions() {
    return this.modules.flatMap(module => module.permissions);
  }
}
