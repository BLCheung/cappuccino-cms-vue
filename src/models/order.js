import HttpKit  from '@/kit/http-kit';
import OrderApi from '@/api/order';

export default class OrderModel {
  
  /**
   * 获取订单分页
   * @param queryOrderDTO
   * @return {AxiosPromise}
   */
  static getOrders(queryOrderDTO = {}) { return HttpKit.GET(OrderApi.ORDERS, queryOrderDTO); }
  
  /**
   * 获取订单详情
   * @param id
   * @return {AxiosPromise}
   */
  static getOrder(id = '') { return HttpKit.GET(OrderApi.ORDER.replace('{id}', id)); }
  
  /**
   * 更新订单状态
   * @param updateOrderStatusDTO
   * @return {AxiosPromise}
   */
  static changeStatus(updateOrderStatusDTO = {}) { return HttpKit.PUT(OrderApi.STATUS, updateOrderStatusDTO); }
}
