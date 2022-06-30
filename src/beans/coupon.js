import CommonUtils from '@/utils/common';

export default class CouponEntity {
  
  id          = '';
  // 优惠券的标题（eg：满1000减50）
  title       = '';
  startTime   = '';
  endTime     = '';
  // 优惠券的描述
  description = '';
  // 该优惠券需要达到的满减条件的价格（满1000减50，则1000为满减条件价格）
  fullMoney   = 0;
  // 优惠的价格（满1000减50，则50为优惠价格）
  minus       = 0;
  // 优惠的折扣率（满1000打8折，则0.8为折扣率）
  rate        = 0;
  // 0. 无门槛券 1.满减券 2.满减折扣券
  type        = '';
  // 该优惠券从属的活动id
  activityId  = '';
  // 优惠券的备注（仅使用XX品类、无门槛）
  remark      = '';
  // 是否为全场券，无视品类
  wholeStore  = 0;
  
  constructor(item) {
    CommonUtils.copy(item, this);
    this.startTime = CommonUtils.parseDate2Str(item.startTime);
    this.endTime   = CommonUtils.parseDate2Str(item.endTime);
  }
}
