import BaseController   from '@/controller/base';
import AdminModel       from '@/models/cms/admin';
import UpdateGroupDTO   from '@/dto/cms/admin/group/update-group-dto';
import UpdateGroupRules from '@/views/cms/admin/groups/components/edit-group-dialog/update-group-rules';
import CommonUtils      from '@/utils/common';
import { Message }      from 'element-ui';

export default class CMSAdminEditGroupDialogController extends BaseController {
  
  groupId = '';
  
  _groupInfo = {};
  
  constructor(context) {
    super(context);
    CommonUtils.copy(this.$getDialogParams(), this._groupInfo);
    this.groupId   = this._groupInfo.id;
    this.FormRules = new UpdateGroupRules(context, this.FormData);
    
    this.bindData2Vue()
        .bindMethod2Vue([ 'onPost', 'onReset' ]);
  }
  
  onFormValidateListener(isValid, field) {
    if (!isValid) return;
    
    this.getVueContext().$confirm('确认无误并修改该分组信息？')
        .then(async _ => {
          await this.updateGroup();
        })
        .catch(_ => {});
  }
  
  onPost() { this.$validateForm(this.ViewRef.form, true); }
  
  onReset() { this.getGroupInfo(); }
  
  getGroupInfo() {
    this.FormData = new UpdateGroupDTO(this._groupInfo);
    this.$updateFormData();
  }
  
  async updateGroup() {
    this.$setSubmitLoading(true);
    this.$setSubmitDisabled(true);
    
    const res = await AdminModel.updateGroup(this.groupId, this.FormData.toDTO());
    if (!res.isOK()) {
      this.$setSubmitLoading(false);
      this.$setSubmitDisabled(false);
      return;
    }
    
    Message.success('修改成功！');
    this.$setSubmitLoading(false);
    this.$setSubmitDisabled(false);
    this.$closeCurrentDialog();
    this.onDispatchUpdateAction(this.FormData.toDTO());
  }
}
