import BaseController    from '@/controller/base';
import OrderModel        from '@/models/order';
import OrderDetailEntity from '@/beans/order-detail';

export default class OrderEditDialogController extends BaseController {
  
  constructor(context) {
    super(context);
    const { id, snapTitle } = this.$getDialogParams();
    this.orderId            = id;
    
    this.ViewData = { dialogTitle: snapTitle, order: {} };
    
    this.bindData2Vue()
        .bindMethod2Vue([]);
  }
  
  async onLoad() {
    await this.getOrderDetail();
  }
  
  async getOrderDetail() {
    this.$setDetailLoading(true);
    const res = await OrderModel.getOrder(this.orderId);
    if (!res.isOK()) {
      this.$setDetailLoading(false);
      return;
    }
    
    this.ViewData.order = new OrderDetailEntity(res.data);
    this.$setDetailLoading(false);
  }
}
