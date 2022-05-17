import BaseRules from '@/rules/base-rules';

export default class UpdateUserPasswordRules extends BaseRules {
  
  constructor(context, FormData) {
    super(context, FormData);
    this.newPassword     = [
      { required: true, trigger: [ 'change', 'blur' ], validator: this.validateNewPassword.bind(this) },
    ];
    this.confirmPassword = [
      { required: true, trigger: [ 'change', 'blur' ], validator: this.validateConfirmPassword.bind(this) },
    ];
  }
  
  validateNewPassword(rule, value, callback) {
    if (value === '') {
      callback(new Error('新密码不能为空！'));
    } else if (value.length < 6) {
      callback(new Error('新密码不能少于6位！'));
    } else {
      if (this.FormData.confirmPassword !== '') {
        this.FormRefs.form.validateField('confirmPassword');
      }
      callback();
    }
  }
  
  validateConfirmPassword(rule, value, callback) {
    if (value === '') {
      callback(new Error('请输入确认密码！'));
    } else if (this.FormData.newPassword !== value) {
      callback(new Error('两次输入密码不一致！'));
    } else {
      callback();
    }
  }
}
