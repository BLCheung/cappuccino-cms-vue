import BaseController       from '@/controller/base';
import OrderModel           from '@/models/order';
import OrderDetailEntity    from '@/beans/order-detail';
import OrderStatus          from '@/common/enum/order-status';
import UpdateOrderStatusDTO from '@/dto/order/update-order-status-dto';
import { Message }          from 'element-ui';

export default class OrderEditDialogController extends BaseController {
  
  constructor(context) {
    super(context);
    const { id, snapTitle } = this.$getDialogParams();
    this.orderId            = id;
    
    this.ViewData = { dialogTitle: snapTitle, order: {} };
    
    this.bindData2Vue()
        .bindMethod2Vue([ 'onUpdateStatus' ]);
  }
  
  async onLoad() {
    await this.getOrderDetail();
  }
  
  async getOrderDetail() {
    this.$setDetailLoading(true);
    this.$setSubmitDisabled(true);
    const res = await OrderModel.getOrder(this.orderId);
    if (!res.isOK()) {
      this.$setDetailLoading(false);
      return;
    }
    
    this.ViewData.order = new OrderDetailEntity(res.data);
    this._parseActionDisabled();
    this.$setDetailLoading(false);
  }
  
  async changeStatus(status = 0) {
    this.$setSubmitLoading(true);
    const dto = new UpdateOrderStatusDTO(this.orderId, status);
    const res = await OrderModel.changeStatus(dto);
    if (!res.isOK()) {
      this.$setSubmitLoading(false);
      return;
    }
    
    Message.success('订单状态已更新！');
    this.onDispatchUpdateAction({ id: this.orderId, status });
    this.$setSubmitLoading(false);
    
    await this.getOrderDetail();
  }
  
  onUpdateStatus() {
    let status = this.ViewData.order.status;
    if (OrderStatus.PAID !== status || OrderStatus.DELIVERED !== status) return;
    
    this.getVueContext().$warningAsync(
      '订单状态一旦更改将无法撤销，确认无误更改该订单状态？',
      '提示',
      async () => this.changeStatus(status + 1),
    );
  }
  
  _parseActionDisabled() {
    const status = this.ViewData.order.status;
    this.$setSubmitDisabled(OrderStatus.PAID !== status || OrderStatus.DELIVERED !== status);
  }
}
