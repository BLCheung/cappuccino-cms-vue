import { validEmail } from '@/utils/validate';

export default {
  username: [ { required: true, trigger: 'change', message: '请填写用户名' } ],
  nickname: [ { required: true, trigger: 'change', message: '请填写昵称' } ],
  email:    [
    {
      required: false, trigger: 'change', validator: (rule, value, callback) => {
        if (!!value) {
          !validEmail(value) && callback(new Error('邮箱格式不正确'));
        }
        callback();
      },
    },
  ],
}
