import BaseDTO from '@/dto/base-dto';

export default class UpdateOrderStatusDTO extends BaseDTO {
  
  orderId = '';
  status  = '';
  
  constructor(orderId = '', status = '') {
    super();
    this.orderId = orderId;
    this.status  = status;
  }
}
