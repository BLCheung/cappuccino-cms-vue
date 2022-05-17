import BaseRules      from '@/rules/base-rules';
import { validEmail } from '@/utils/validate';


export default class RegisterUserRules extends BaseRules {
  
  constructor(context, FormData) {
    super(context, FormData);
    this.username        = [
      { required: true, trigger: [ 'change', 'blur' ], validator: this.validateUserName.bind(this) },
    ];
    this.email           = [
      { required: false, trigger: [ 'change', 'blur' ], validator: this.validateEmail.bind(this) },
    ];
    this.password        = [
      { required: true, trigger: [ 'change', 'blur' ], validator: this.validatePassword.bind(this) },
    ];
    this.confirmPassword = [
      { required: true, trigger: [ 'change', 'blur' ], validator: this.validateConfirmPassword.bind(this) },
    ]
    this.groupIds        = [
      { required: false, trigger: [ 'change', 'blur' ], type: 'array' },
    ];
  }
  
  validateUserName(rule, value, callback) {
    if (value === '') {
      callback(new Error('请填写用户名！'));
    } else {
      if (value.length < 2 || value.length > 6) {
        callback('用户名长度必须在2~6为之间！');
      } else { callback(); }
    }
  }
  
  validateEmail(rule, value, callback) {
    if (value !== '' && !validEmail(value)) {
      callback('邮箱格式不正确！');
    } else {
      callback();
    }
  }
  
  validatePassword(rule, value, callback) {
    if (value === '') {
      callback(new Error('新密码不能为空！'));
    } else {
      value.length < 6 && callback(new Error('新密码不能少于6位！'));
      if (this.FormData.confirmPassword !== '') {
        this.FormRefs.form.validateField('confirmPassword');
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
