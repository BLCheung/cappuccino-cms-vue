import CommonUtils from '@/utils/common';

export default class BaseDTO {
  // 视图数据（需要绑定在视图上但不需要提交到后端的数据对象）
  $VO = {};
  
  constructor() {}
  
  /**
   * 重置表单
   * @deprecated
   */
  reset() {
    const FormFields = Object.keys(this).filter(key => key !== '$VO');
    const $VOKeys    = Object.keys(this.$VO);
    CommonUtils.forEach(FormFields, field => {
      this.hasOwnProperty(field) && (this[field] = '');
    });
    CommonUtils.forEach($VOKeys, VOField => {
      this.$VO[VOField] = '';
    });
  }
  
  /**
   * 转换成后端所需的DTO对象
   * @return {{}}
   */
  toDTO() {
    let dto = {};
    
    CommonUtils.deepClone(this, dto);
    // 删除后端不需要的视图数据
    delete dto.$VO;
    
    return dto;
  }
}
