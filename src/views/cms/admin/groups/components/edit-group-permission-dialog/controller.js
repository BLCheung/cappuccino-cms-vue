import BaseController         from '@/controller/base';
import AdminModel             from '@/models/cms/admin';
import GroupPermissionEntity  from '@/beans/cms/group-permission';
import DispatchPermissionsDTO from '@/dto/cms/admin/group/dispatch-permissions-dto';

export default class EditGroupPermissionDialogController extends BaseController {
  
  _oldPermissions = [];
  
  constructor(context) {
    super(context);
    this.groupId               = this.$getDialogParams().groupId;
    this.groupPermissionEntity = null;
    
    this.ViewData = { groupName: '', allModules: [] };
    
    this.bindData2Vue()
        .bindMethod2Vue([]);
  }
  
  async onLoad() {
    await this.getGroupAndPermission();
  }
  
  async getGroupAndPermission() {
    this.$setDetailLoading(true);
    this.$setSubmitDisabled(true);
    const res = await AdminModel.getGroup(this.groupId);
    console.log('getGroupAndPermission:', res);
    if (!res.isOK()) {
      this.$setDetailLoading(false);
      return;
    }
    
    this.groupPermissionEntity = new GroupPermissionEntity(res.data);
    this.ViewData.groupName    = this.groupPermissionEntity.name;
    // 当前分组的所有权限模块
    this.ViewData.allModules   = this.groupPermissionEntity.modules;
    // 保存原先的所有权限集合
    this._oldPermissions       = this.groupPermissionEntity.modules.flatMap(m => m.permissions);
    
    this.updateGroupPermission(this._oldPermissions);
    
    this.$setDetailLoading(false);
    this.$setSubmitDisabled(false);
  }
  
  updateGroupPermission(permissions = []) {
    this.FormData = new DispatchPermissionsDTO(this.groupId, permissions);
    this.$updateFormData();
  }
}
