import {_reqAPI, _reqImageAPI} from '../apiModule';

export default {
  _getStoreList: async data => {
    const result = await _reqAPI('proc_store_list.php', data);
    return result;
  },
  _getLifeStyleList: async data => {
    const result = await _reqAPI('proc_lifestyle_list.php', data);
    return result;
  },
  _getLifeStyleStoreInfo: async data => {
    const result = await _reqAPI('proc_lifestyle_view.php', data);
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
  _getStoreReview: async data => {
    const result = await _reqAPI('proc_store_review_list.php', data);
    return result;
  },
  _writeReview: async data => {
    const result = await _reqImageAPI('proc_review_input.php', data);
    return result;
  },
};
