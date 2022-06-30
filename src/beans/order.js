import CommonUtils from '@/utils/common';
import OrderStatus from '@/common/enum/order-status';
import dayjs       from 'dayjs';

export default class OrderEntity {
  
  id              = '';
  orderNo         = '';
  userId          = '';
  totalPrice      = 0.00;
  totalCount      = 0;
  createTime      = '';
  placedTime      = '';
  payTime         = '';
  expiredTime     = '';
  snapImg         = '';
  snapTitle       = '';
  prepayId        = '';
  finalTotalPrice = 0.00;
  status          = '';
  statusStr       = '';
  remark          = '';
  
  constructor(item) {
    CommonUtils.copy(item, this);
    this._checkExpired();
    this._parseStatusStr();
  }
  
  updateStatus(status = '') {
    this.status = status;
    this._parseStatusStr();
  }
  
  _checkExpired() {
    const isExpired = dayjs().isAfter(dayjs(this.expiredTime));
    if (isExpired) this.status = OrderStatus.EXPIRED;
  }
  
  _parseStatusStr() {
    switch (this.status) {
      case OrderStatus.EXPIRED:
        this.statusStr = '已过期';
        break;
      case OrderStatus.UNPAID:
        this.statusStr = '待支付';
        break;
      case OrderStatus.PAID:
        this.statusStr = '已支付';
        break;
      case OrderStatus.DELIVERED:
        this.statusStr = '已发货';
        break;
      case OrderStatus.FINISHED:
        this.statusStr = '已完成';
        break;
      case OrderStatus.CANCELED:
        this.statusStr = '已取消';
        break;
      
      default:
        this.statusStr = '未知';
        break;
    }
  }
}
