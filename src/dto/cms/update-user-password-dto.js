import BaseDTO from '@/dto/base-dto';

export default class UpdateUserPasswordDTO extends BaseDTO {
  
  password        = '';
  newPassword     = '';
  confirmPassword = '';
  
  constructor() {
    super();
  }
}
