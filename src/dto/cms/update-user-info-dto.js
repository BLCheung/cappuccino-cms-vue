import BaseDTO     from '@/dto/base-dto';
import CommonUtils from '@/utils/common';

export default class UpdateUserInfoDTO extends BaseDTO {
  
  username = '';
  email    = '';
  nickname = '';
  
  constructor(data) {
    super();
    CommonUtils.copy(data, this);
  }
}
