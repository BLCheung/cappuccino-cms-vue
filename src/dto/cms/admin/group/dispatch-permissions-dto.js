import BaseDTO from '@/dto/base-dto';

export default class DispatchPermissionsDTO extends BaseDTO {
  
  groupId       = '';
  permissionIds = [];
  
  constructor(groupId = '', permissionIds = []) {
    super();
    this.groupId       = groupId;
    this.permissionIds = permissionIds;
  }
}
