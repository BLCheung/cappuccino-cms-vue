import BaseController         from '@/controller/base';
import CommonUtils            from '@/utils/common';
import AdminModel             from '@/models/cms/admin';
import { Message }            from 'element-ui';
import UpdateUserGroupDTO     from '@/dto/cms/admin/user/update-user-group-dto';
import ResetUserPasswordDTO   from '@/dto/cms/admin/user/reset-user-password-dto';
import ResetUserPasswordRules from './reset-user-password-rules';

export default class CMSAdminEditUserDialogController extends BaseController {
  
  _userGroups = [];
  
  constructor(context) {
    super(context);
    console.log('dialogParams:', this.$getDialogParams());
    const { user, groups } = this.$getDialogParams();
    this.user              = user;
    this.allGroups         = groups;
    
    // 备份一份
    CommonUtils.deepClone(this.user.groups, this._userGroups);
    
    this.ViewData  = { user, allGroups: this.allGroups, checkGroupIds: [] };
    this.ViewRef   = { passwordForm: 'passwordForm' };
    this.FormData  = new ResetUserPasswordDTO();
    this.FormRules = new ResetUserPasswordRules(this.getVueContext(), this.FormData);
    
    this.bindData2Vue()
        .bindMethod2Vue([ 'onGroupReset', 'onGroupPost', 'onPasswordReset', 'onPasswordPost' ]);
  }
  
  onLoad() { this.checkGroups(this.user.groups); }
  
  onGroupReset() { this.checkGroups(this._userGroups); }
  
  onGroupPost() {
    this.getVueContext().$confirm('确认无误并提交？')
        .then(async _ => await this.dispatchGroup())
        .catch(() => {});
  }
  
  onPasswordPost() { this.$validateForm(this.ViewRef.passwordForm) }
  
  onPasswordReset() { this.$resetForm(this.ViewRef.passwordForm) }
  
  onFormValidateListener(isValid, field) {
    if (!isValid) {
      Message.warning('请把表单补充完整');
      return;
    }
    this.getVueContext().$confirm('该用户的密码将改变，确认无误并修改？')
        .then(async _ => this.resetUserPassword())
        .catch(() => {});
  }
  
  async dispatchGroup() {
    this.$setSubmitLoading();
    const res = await AdminModel.dispatchGroups(this.user.id, new UpdateUserGroupDTO(this.ViewData.checkGroupIds).toDTO());
    if (!res.isOK()) {
      this.$setSubmitLoading(false);
      return;
    }
    
    Message.success('分组修改成功！');
    this.$setSubmitLoading(false);
    this.$setSubmitDisabled();
    this.onDispatchUpdateAction();
    this.onDispatchCloseAction();
  }
  
  async resetUserPassword() {
    this.$setSubmitLoading();
    const res = await AdminModel.resetUserPassword(this.user.id, this.FormData.toDTO());
    if (!res.isOK()) {
      this.$setSubmitLoading(false);
      return;
    }
    
    Message.success('密码修改成功！');
    this.$setSubmitLoading(false);
    this.$setSubmitDisabled();
    this.onDispatchCloseAction();
  }
  
  checkGroups(groups = []) { this.ViewData.checkGroupIds = groups.map(group => group.id); }
}
