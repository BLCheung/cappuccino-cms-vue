import BaseDTO from '@/dto/base-dto';

export default class CreateGroupDTO extends BaseDTO {
  
  name          = '';
  info          = '';
  permissionIds = [];
  
  constructor() {
    super();
  }
}
