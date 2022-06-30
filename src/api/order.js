import Config from '@/config/config';

const prefix = `${ Config.apiVersion }order`;

const OrderApi = {
  // C端订单分页
  ORDERS: `${ prefix }/page`,
  // C端订单详情
  ORDER:  `${ prefix }/{id}`,
  // C端修改订单状态
  STATUS: `${ prefix }/status`,
}

export default OrderApi;
