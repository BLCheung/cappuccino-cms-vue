import BaseController          from '@/controller/base';
import store                   from '@/store';
import UserModel               from '@/models/cms/user';
import UpdateUserPasswordDTO   from '@/dto/cms/update-user-password-dto';
import UpdateUserPasswordRules from './user-password-rules';
import { Message }             from 'element-ui';

export default class UserController extends BaseController {
  
  editDialogData = {
    title:  '编辑个人信息',
    center: true,
  };
  
  constructor(context) {
    super(context);
  }
  
  onVueContextMounted(VueContext = null) {
    // 视图层与业务层的数据初始化
    this.ViewData  = { userInfo: {}, canGetUserInfo: true };
    this.FormData  = new UpdateUserPasswordDTO();
    this.FormRules = new UpdateUserPasswordRules(VueContext, this.FormData);
    this.bindData2Vue()
        .bindMethod2Vue([
          'onGetUserInfoAndPermissions',
          'onEditUserInfo',
          'onUserInfoUpdate',
          'onPasswordReset',
          'onPasswordPost',
        ]);
  }
  
  onFormValidateListener(isValid, field) {
    if (!isValid) return;
    this.getVueContext().$confirm('确认密码无误并提交？')
        .then(async _ => await this.updateUserPassword())
        .catch(_ => {});
  }
  
  getUserInfo() {
    this.ViewData.userInfo = store.getters['user/userInfo'];
  }
  
  async onGetUserInfoAndPermissions() {
    if (!this.ViewData.canGetUserInfo) return;
    this.ViewData.canGetUserInfo = false;
    this.$setDetailLoading(true);
    const res = await UserModel.getUserInfoAndPermissions();
    if (!res.isOK()) {
      this.ViewData.canGetUserInfo = true;
      this.$setDetailLoading(false);
      return;
    }
    await store.dispatch('user/initUserAndPermission', res.data);
    this.getUserInfo();
    Message.success('更新成功！');
    this.ViewData.canGetUserInfo = true;
    this.$setDetailLoading(false);
  }
  
  onEditUserInfo() {
    this.onCreateDialog(this.editDialogData);
    this.$openDialog();
  }
  
  onUserInfoUpdate(userInfo = {}) {
    Message.success('更新成功！');
    store.commit('user/setUserInfo', userInfo);
    this.getUserInfo();
  }
  
  async updateUserPassword() {
    this.$setSubmitLoading(true);
    const res = await UserModel.updatePassword(this.FormData.toDTO());
    if (!res.isOK()) {
      this.$setSubmitLoading(false);
      return;
    }
    this.onPasswordReset();
    this.$setSubmitLoading(false);
    Message.success('密码更新成功！!');
  }
  
  onPasswordReset() { this.$resetForm(this.ViewRef.form); }
  
  onPasswordPost() { this.$validateForm(this.ViewRef.form, true); }
}
