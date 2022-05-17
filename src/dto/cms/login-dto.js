import BaseDTO from '@/dto/base-dto';

export default class LoginDTO extends BaseDTO {
  username = '';
  password = '';
  
  constructor() {
    super();
    this.$VO = {};
  }
}
