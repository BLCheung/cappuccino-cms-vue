import PagingController from '@/controller/page';
import AdminModel       from '@/models/cms/admin';
import UserGroupEntity  from '@/beans/cms/user-group';
import CommonUtils      from '@/utils/common';
import GroupEntity      from '@/beans/cms/group';
import { Message }      from 'element-ui';

export default class CMSAdminUserPagingController extends PagingController {
  
  editUserDialog = {
    title: '编辑用户',
    width: '60%',
  }
  
  constructor(context) {
    super(context);
    // 分页请求函数
    this.PagingRequest = AdminModel.getUsers;
    // 分页实体
    this.PagingEntity  = UserGroupEntity;
    // 搜索参数
    this.PagingSearch  = { groupId: '' };
    // 定义的视图数据
    this.ViewData      = { selectGroup: '', groupOptions: [] };
    // 绑定引用到Vue视图层
    this.bindData2Vue()
        .bindMethod2Vue([ 'onSelectGroup', 'onUserEdit', 'onUserDelete', 'onUpdate' ]);
  }
  
  async onLoad() {
    await Promise.all([
      this.$startPaging(true),
      this.getGroups(),
    ])
  }
  
  async onUpdate() { await this.$startPaging(); }
  
  onTableRowItemInit({ row, rowIndex }) {
    // noinspection JSValidateTypes
    row.groupNames = row.groups.map(group => group.name).join('，');
  }
  
  async onPagingQueryChange({ page, limit }) {
    this.PagingQuery.page  = page;
    this.PagingQuery.limit = limit;
    await this.$startPaging();
  }
  
  async getGroups() {
    if (this.ViewData.groupOptions.length > 0) return;
    this.$setDetailLoading();
    const res = await AdminModel.getGroups();
    if (!res.isOK()) {
      this.ViewData.groupOptions = [];
      this.$setDetailLoading(false);
      return;
    }
    this.ViewData.groupOptions = CommonUtils.transformList(res.data, GroupEntity);
    this.$setDetailLoading(false);
  }
  
  async onSelectGroup(id) {
    this.PagingSearch.groupId = id;
    await this.$startPaging(true);
  }
  
  onUserEdit(user) {
    const params = { user, groups: this.ViewData.groupOptions };
    this.onCreateDialog(this.editUserDialog);
    this.$setDialogParams(params);
    this.$openDialog();
  }
  
  onUserDelete(id) {
    this.getVueContext().$warningAsync('该操作将会永久删除该用户！确认无误并删除？', '警告',
      async () => await this.deleteUser(id));
  }
  
  
  async deleteUser(userId = '') {
    this.$setPagingLoading(true);
    const res = await AdminModel.deleteUser(userId);
    if (!res.isOK()) {
      this.$setPagingLoading(false);
      return;
    }
    
    Message.success('删除成功！');
    this.$deleteItemById(userId);
    this.$setPagingLoading(false);
  }
}
