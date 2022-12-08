import {API} from '../API';
import {_reqAPI} from '../apiModule';

export default {
  _getCouponBookList: async data => {
    const result = await _reqAPI('proc_couponbook_list.php', data);
    return result;
  },
  _getCpnBookDtl: async data => {
    const result = await _reqAPI('proc_couponbook_detail.php', data);
    return result;
  },
};
