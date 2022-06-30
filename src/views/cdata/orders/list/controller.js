import PagingController from '@/controller/page';
import OrderModel       from '@/models/order';
import OrderEntity      from '@/beans/order';
import OrderStatus      from '@/common/enum/order-status';
import DialogType       from '@/common/enum/dialog-type';
import CommonUtils      from '@/utils/common';
import { Message }      from 'element-ui';

export default class CDataOrdersPagingController extends PagingController {
  
  constructor(context) {
    super(context);
    
    this.PagingRequest = OrderModel.getOrders;
    this.PagingEntity  = OrderEntity;
    this.PagingSearch  = { keyword: '', startTime: '', endTime: '' };
    // 旧的关键词，防止未点击搜索的情况下直接加载下一页会出现不一致的分页结果
    this.ViewData      = { oldKeyword: '', dateRange: [] };
    
    this.DialogData = {
      title: '订单详情',
      type:  DialogType.Large,
    }
    
    this.bindData2Vue()
        .bindMethod2Vue([ 'onKeywordSearch', 'onOrderEdit', 'onOrderDelete' ]);
  }
  
  async onLoad() { await this.$startPaging(true); }
  
  onTableRowItemInit({ row, rowIndex }) {
    const { status } = row;
    switch (status) {
      case OrderStatus.EXPIRED:
        row.tagType = 'danger';
        break;
      case OrderStatus.UNPAID:
        row.tagType = 'warning';
        break;
      case OrderStatus.PAID:
        row.tagType = 'success';
        break;
      case OrderStatus.DELIVERED:
        row.tagType = '';
        break;
      case OrderStatus.FINISHED:
        row.tagType = 'info';
        break;
      case OrderStatus.CANCELED:
        row.tagType = 'info';
        break;
      
      default:
        row.tagType = 'danger';
        break;
    }
  }
  
  async onKeywordSearch() {
    this.PagingSearch.keyword   = this.ViewData.oldKeyword;
    this.PagingSearch.startTime = CommonUtils.parseDate2Str(!!this.ViewData.dateRange && this.ViewData.dateRange[0]);
    this.PagingSearch.endTime   = CommonUtils.parseDate2Str(!!this.ViewData.dateRange && this.ViewData.dateRange[1]);
    await this.$startPaging(true);
  }
  
  onOrderEdit(row) {
    const { id, snapTitle } = row;
    this.DialogData.title   = snapTitle;
    this.$setDialogParams({ id, snapTitle });
    this.onCreateDialog();
    this.$openDialog();
  }
  
  onOrderDelete(id) { Message.warning('暂不支持删除C端用户的订单！'); }
  
  onPagingQueryChange({ page, limit }) {
    this.PagingQuery.page  = page;
    this.PagingQuery.limit = limit;
  }
}
