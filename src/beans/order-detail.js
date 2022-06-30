import OrderEntity    from '@/beans/order';
import CommonUtils    from '@/utils/common';
import CouponEntity   from '@/beans/coupon';
import SkuOrderEntity from '@/beans/sku-order';

export default class OrderDetailEntity extends OrderEntity {
  
  // 收货地址
  snapAddress = '';
  // 订单SKU信息
  snapItems   = [];
  // 使用的优惠券
  couponList  = [];
  
  constructor(data) {
    super(data);
    this.snapItems  = CommonUtils.transformList(data.snapItems, SkuOrderEntity);
    this.couponList = CommonUtils.transformList(data.couponList, CouponEntity);
  }
}
