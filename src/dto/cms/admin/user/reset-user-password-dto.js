import BaseDTO from '@/dto/base-dto';

export default class ResetUserPasswordDTO extends BaseDTO {
  
  password        = '';
  confirmPassword = ''
  
  constructor() {
    super();
  }
  
}
