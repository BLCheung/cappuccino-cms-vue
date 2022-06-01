import PagingController from '@/controller/page';
import AdminModel       from '@/models/cms/admin';
import CommonUtils      from '@/utils/common';
import GroupEntity      from '@/beans/cms/group';
import UserLevel        from '@/common/enum/user-level';
import DialogType       from '@/common/enum/dialog-type';

export default class CMSAdminGroupsController extends PagingController {
  
  _groupList = [];
  
  groupInfoDialog       = { title: '分组信息' };
  groupPermissionDialog = { title: '分配权限', type: DialogType.Large };
  
  constructor(context) {
    super(context);
    
    this.ViewData        = { selectGroup: '', groupOptions: [] };
    this.MultiDialogData = {
      groupInfoDialog:       this.$initMultiDialog(this.groupInfoDialog),
      groupPermissionDialog: this.$initMultiDialog(this.groupPermissionDialog),
    }
    
    this.bindData2Vue()
        .bindMethod2Vue([ 'onGroupInfoUpdate', 'onSelectGroup', 'onGroupEdit', 'onGroupDelete', 'onGroupDispatch' ]);
  }
  
  async onLoad() {
    await this.getGroups();
  }
  
  onTableRowItemInit({ row, rowIndex }) {
    const { level } = row;
    UserLevel.Root === level && (row.tagType = 'warning');
    UserLevel.Admin === level && (row.tagType = 'success');
    UserLevel.User === level && (row.tagType = '');
    UserLevel.Guest === level && (row.tagType = 'info');
  }
  
  onGroupInfoUpdate(group) { this.$updateItemById(group.id, group); }
  
  onSelectGroup(id) {
    if (!CommonUtils.isNull(id)) {
      const group = this._groupList.find(group => this.$isSameItem(id, group));
      this.$setList([ group ]);
    } else {
      this.$setList(this._groupList);
    }
  }
  
  onGroupEdit(row) {
    this.$setDialogParams(row, this.groupInfoDialog);
    this.$openDialog(this.groupInfoDialog);
  }
  
  onGroupDelete(id) {
    this.getVueContext().$warningAsync('该分组将会被删除！确认无误并删除？', '警告',
      async () => await this.deleteGroup(id));
  }
  
  onGroupDispatch(row) {
    this.groupPermissionDialog.title = row.name;
    this.$setDialogParams(row, this.groupPermissionDialog);
    this.$openDialog(this.groupPermissionDialog);
  }
  
  async getGroups() {
    this.$setPagingLoading(true);
    const res = await AdminModel.getGroups();
    if (!res.isOK()) {
      this.$setPagingLoading(false);
      return;
    }
    this._groupList = CommonUtils.transformList(res.data, GroupEntity);
    this.$setList(this._groupList);
    this.ViewData.groupOptions = this._groupList;
    this.$setPagingLoading(false);
  }
  
  async deleteGroup(groupId = '') {
    this.$setPagingLoading(true);
    const res = await AdminModel.deleteGroup(groupId);
    if (!res.isOK()) {
      this.$setPagingLoading(false);
      return;
    }
    
    this.$deleteItemById(groupId);
    this.$setPagingLoading(false);
  }
}
