import PagingController from '@/controller/page';
import CUserModel       from '@/models/cuser';
import CUserEntity      from '@/beans/cuser';
import DialogType       from '@/common/enum/dialog-type';

export default class CDataUsersPagingController extends PagingController {
  
  editCUserInfoDialog = {
    title: '用户信息',
    type:  DialogType.Large,
  };
  
  constructor(context) {
    super(context);
    // 分页请求
    this.PagingRequest = CUserModel.getCUsers;
    // 实体
    this.PagingEntity  = CUserEntity;
    // 真实的索关键词
    this.PagingSearch  = { keyword: '' };
    // 旧的关键词，防止未点击搜索的情况下直接加载下一页会出现不一致的分页结果
    this.ViewData      = { oldKeyword: '' };
    
    this.bindData2Vue()
        .bindMethod2Vue([ 'onKeywordSearch', 'onUserEdit', 'onUserDelete' ]);
  }
  
  async onLoad() { await this.$startPaging(true); }
  
  async onKeywordSearch() {
    // 只有点击搜索时才赋值
    this.PagingSearch.keyword = this.ViewData.oldKeyword;
    await this.$startPaging(true);
  }
  
  onUserEdit(user) {
    const { id } = user;
    this.$setDialogParams({ id }, this.editCUserInfoDialog);
    this.onCreateDialog(this.editCUserInfoDialog);
    this.$openDialog();
  }
  
  onUserDelete(id) {}
  
  /**
   * 分页改变
   * @override
   */
  async onPagingQueryChange({ page, limit }) {
    this.PagingQuery.page  = page;
    this.PagingQuery.limit = limit;
    await this.$startPaging();
  }
}
