/**
 * 提供给订单展示的Sku实体信息
 */
import CommonUtils from '@/utils/common';

export default class SkuOrderEntity {
  
  id         = '';
  // 所属SPU的id
  spuId      = '';
  // 单价
  price      = 0.00;
  // 总价
  totalPrice = 0.00;
  // 购买数量
  count      = 0;
  title      = '';
  img        = '';
  // 规格值数组（[ 黑色, 128G ]）
  specValues = [];
  specStr    = '';
  
  constructor(item) {
    CommonUtils.copy(item, this);
    this._parseSpecStr();
  }
  
  _parseSpecStr() {
    if (this.specValues && this.specValues.length) {
      this.specStr = this.specValues.join(' · ');
    }
  }
}
