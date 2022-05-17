import BaseDTO from '@/dto/base-dto';

export default class UpdateUserGroupDTO extends BaseDTO {
  
  groupIds = [];
  
  constructor(groupIds = []) {
    super();
    this.groupIds = groupIds;
  }
}
