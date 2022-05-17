import BaseDTO     from '@/dto/base-dto';
import CommonUtils from '@/utils/common';

export default class UpdateGroupDTO extends BaseDTO {
  
  name = '';
  info = '';
  
  constructor(data) {
    super();
    CommonUtils.copy(data, this);
  }
}
