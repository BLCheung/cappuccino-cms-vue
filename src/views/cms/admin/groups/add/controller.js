import BaseController         from '@/controller/base';
import AdminModel             from '@/models/cms/admin';
import CreateGroupDTO         from '@/dto/cms/admin/group/create-group-dto';
import CreateGroupRules       from './create-group-rules';
import PermissionModuleEntity from '@/beans/cms/permission-module';
import CommonUtils            from '@/utils/common';
import { Message }            from 'element-ui';

export default class CMSAdminCreateGroupController extends BaseController {
  
  constructor(context) {
    super(context);
    this.ViewData  = { allModules: [] };
    this.FormData  = new CreateGroupDTO();
    this.FormRules = new CreateGroupRules();
    
    this.bindData2Vue()
        .bindMethod2Vue([ 'onReset', 'onPost' ]);
  }
  
  async onLoad() {
    this.$setDetailLoading(true);
    await this.getPermissions();
    this.$setDetailLoading(false);
  }
  
  onPost() { this.$validateForm(this.ViewRef.form, true); }
  
  onReset() { this.$resetForm(this.ViewRef.form); }
  
  async onFormValidateListener(isValid, field) {
    if (!isValid) return;
    await this.createGroup();
  }
  
  async getPermissions() {
    this.$setSubmitDisabled(true);
    const res = await AdminModel.getPermissions();
    if (!res.isOK()) {
      this.$setDetailLoading(false);
      return;
    }
    
    this.ViewData.allModules = CommonUtils.transformList(res.data, PermissionModuleEntity);
    this.$setSubmitDisabled(false);
  }
  
  async createGroup() {
    this.$setSubmitDisabled(true)
    this.$setSubmitLoading(true);
    const res = await AdminModel.createGroup(this.FormData.toDTO());
    if (!res.isOK()) {
      this.$setSubmitDisabled(false)
      this.$setSubmitLoading(false);
      return;
    }
    
    Message.success('分组创建成功！');
    this.$resetForm(this.ViewRef.form);
    this.$setSubmitDisabled(false)
    this.$setSubmitLoading(false);
  }
}
