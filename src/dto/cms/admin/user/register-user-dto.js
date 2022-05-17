import BaseDTO from '@/dto/base-dto';

export default class RegisterUserDTO extends BaseDTO {
  
  username        = '';
  email           = '';
  password        = '';
  confirmPassword = '';
  groupIds        = [];
  
  constructor() {
    super();
  }
}
