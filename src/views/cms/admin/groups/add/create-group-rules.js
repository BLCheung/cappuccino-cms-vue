import BaseRules from '@/rules/base-rules';

export default class CreateGroupRules extends BaseRules {
  constructor(context, FormData) {
    super(context, FormData);
    this.name          = [
      { required: true, trigger: [ 'change', 'blur' ], validator: this.validateGroupName.bind(this) },
    ];
    this.info          = [
      { required: false, trigger: [ 'change', 'blur' ], validator: this.validateGroupInfo.bind(this) },
    ];
    this.permissionIds = [
      { require: false, type: 'array' },
    ];
  }
  
  validateGroupName(rule, value, callback) {
    if (value === '') {
      callback(new Error('请输入分组名称！'));
    } else {
      if (value.length > 60) {
        callback(new Error('分组名称不能超过60个字'));
      } else { callback(); }
    }
  }
  
  validateGroupInfo(rule, value, callback) {
    if (value.length > 255) {
      callback(new Error('分组描述不能超过255个字！'));
    } else { callback(); }
  }
}
