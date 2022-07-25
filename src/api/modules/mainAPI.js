import {_reqAPI} from '../apiModule';

export default {
  _getStoreList: async data => {
    const result = await _reqAPI('proc_store_list.php', data);
    return result;
  },
  _getCategory: async data => {
    const result = await _reqAPI('proc_category_list.php', data);
    return result;
  },
  _getOrderHistory: async data => {
    const result = await _reqAPI('proc_order_list.php', data);
    return result;
  },
  _getOrderDetail: async data => {
    const result = await _reqAPI('proc_order_detail.php', data);
    return result;
  },
  _getCoupon: async data => {
    const result = await _reqAPI('proc_coupon_list.php', data);
    return result;
  },
  _getUseInfo: async data => {
    const result = await _reqAPI('proc_info_use.php', data);
    return result;
  },
};
