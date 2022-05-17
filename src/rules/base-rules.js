import CommonUtils from '@/utils/common';

export default class BaseRules {
  FormData  = {};
  FormRefs = {};
  
  constructor(context, FormData) {
    this.FormRefs = context?.$refs;
    this.FormData  = FormData;
  }
  
  /**
   * 重置校验规则
   * @deprecated
   */
  reset() {
    const allFormRefs = Object.keys(this.FormRefs);
    if (CommonUtils.isNull(allFormRefs)) return;
    CommonUtils.forEach(allFormRefs, formRef => {
      if (this.FormRefs[formRef].$options.name === 'ElForm') {
        this.FormRefs[formRef].resetFields();
      }
    });
  }
}
