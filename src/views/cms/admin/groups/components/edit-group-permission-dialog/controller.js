import BaseController         from '@/controller/base';
import AdminModel             from '@/models/cms/admin';
import GroupPermissionEntity  from '@/beans/cms/group-permission';
import DispatchPermissionsDTO from '@/dto/cms/admin/group/dispatch-permissions-dto';
import CommonUtils            from '@/utils/common';
import PermissionModuleEntity from '@/beans/cms/permission-module';
import { Message }            from 'element-ui';

export default class EditGroupPermissionDialogController extends BaseController {
  
  _oldPermissions = [];
  
  constructor(context) {
    super(context);
    this.group                 = this.$getDialogParams();
    this.groupPermissionEntity = null;
    
    this.ViewData = { groupName: this.group.name, allModules: [] };
    
    this.bindData2Vue()
        .bindMethod2Vue([ 'onPost', 'onReset' ]);
  }
  
  async onLoad() {
    await this.getPermission();
  }
  
  onReset() {
    this.updateGroupPermission(this._oldPermissions);
  }
  
  onPost() {
    this.getVueContext().$warningAsync('确认无误并提交？', '提示',
      async () => await this.dispatchPermissions());
  }
  
  async getPermission() {
    const res = await AdminModel.getPermissions();
    if (!res.isOK()) return;
    
    this.ViewData.allModules = CommonUtils.transformList(res.data, PermissionModuleEntity);
    await this.getGroupAndPermission();
  }
  
  async dispatchPermissions() {
    this.$setSubmitLoading(true);
    this.$setSubmitDisabled(true);
    
    const res = await AdminModel.dispatchPermissions(this.FormData.toDTO());
    if (!res.isOK()) {
      this.$setSubmitLoading(false);
      this.$setSubmitDisabled(false);
      return;
    }
    
    Message.success('分配成功！');
    this.$setSubmitLoading(false);
    this.$setSubmitDisabled(false);
    
    this.$closeCurrentDialog();
  }
  
  async getGroupAndPermission() {
    this.$setDetailLoading(true);
    this.$setSubmitDisabled(true);
    const res = await AdminModel.getGroup(this.group.id);
    if (!res.isOK()) {
      this.$setDetailLoading(false);
      return;
    }
    
    this.groupPermissionEntity = new GroupPermissionEntity(res.data);
    this.ViewData.groupName    = this.groupPermissionEntity.name;
    // 保存原先的所有权限集合
    this._oldPermissions       = this.groupPermissionEntity.getPermissions();
    
    this.updateGroupPermission(this._oldPermissions);
    
    this.$setDetailLoading(false);
    this.$setSubmitDisabled(false);
  }
  
  updateGroupPermission(permissions = []) {
    const permissionIds = permissions.map(p => p.id);
    this.FormData       = new DispatchPermissionsDTO(this.group.id, permissionIds);
    this.$updateFormData();
  }
}
