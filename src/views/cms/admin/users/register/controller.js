import BaseController    from '@/controller/base';
import AdminModel        from '@/models/cms/admin';
import UserModel         from '@/models/cms/user';
import RegisterUserDTO   from '@/dto/cms/admin/user/register-user-dto';
import RegisterUserRules from '@/views/cms/admin/users/register/register-user-rules';
import CommonUtils       from '@/utils/common';
import GroupEntity       from '@/beans/cms/group';
import { Message }       from 'element-ui';

export default class CMSAdminRegisterUserController extends BaseController {
  
  constructor(context) {
    super(context);
    this.ViewData  = { allGroups: [] };
    this.FormData  = new RegisterUserDTO();
    this.FormRules = new RegisterUserRules(this.getVueContext(), this.FormData);
    
    this.bindData2Vue()
        .bindMethod2Vue([ 'onRegisterReset', 'onRegisterPost' ]);
  }
  
  async onLoad() {
    await this.getGroups();
  }
  
  onRegisterPost() { this.$validateForm(this.ViewRef.form); }
  
  onRegisterReset() { this.$resetForm(this.ViewRef.form); }
  
  async onFormValidateListener(isValid, field) {
    if (!isValid) {
      Message.warning('请把注册信息填写完整！');
      return;
    }
    await this.registerUser();
  }
  
  async registerUser() {
    this.$setSubmitLoading(true);
    this.$setSubmitDisabled(true);
    
    const res = await UserModel.register(this.FormData.toDTO());
    if (!res.isOK()) {
      this.$setSubmitLoading(false);
      this.$setSubmitDisabled(false);
      return;
    }
    
    this.$resetForm(this.ViewRef.form);
    this.$setSubmitLoading(false);
    this.$setSubmitDisabled(false);
  }
  
  async getGroups() {
    this.$setSubmitDisabled(true);
    // 清空一下
    this.ViewData.allGroups = [];
    const res               = await AdminModel.getGroups();
    if (!res.isOK()) return;
    
    this.ViewData.allGroups = CommonUtils.transformList(res.data, GroupEntity);
    this.$setSubmitDisabled(false);
  }
}
