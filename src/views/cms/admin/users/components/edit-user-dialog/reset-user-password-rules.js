import BaseRules from '@/rules/base-rules';

export default class ResetUserPasswordRules extends BaseRules {
  
  constructor(context, FormData) {
    super(context, FormData);
    this.password        = [
      { required: true, trigger: [ 'change', 'blur' ], validator: this.validatePassword.bind(this) },
    ];
    this.confirmPassword = [
      { required: true, trigger: [ 'change', 'blur' ], validator: this.validateConfirmPassword.bind(this) },
    ]
  }
  
  validatePassword(rule, value, callback) {
    if (value === '') {
      callback(new Error('新密码不能为空！'));
    } else {
      value.length < 6 && callback(new Error('新密码不能少于6位！'));
      if (this.FormData.confirmPassword !== '') {
        this.FormRefs.passwordForm.validateField('confirmPassword');
      }
      callback();
    }
  }
  
  validateConfirmPassword(rule, value, callback) {
    if (value === '') {
      callback('请输入确认密码！');
    } else if (this.FormData.password !== value) {
      callback(new Error('两次输入密码不一致！'));
    } else {
      callback();
    }
  }
}
