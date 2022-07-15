import {_reqAPI} from '../apiModule';

export default {
  _getStoreInfo: async data => {
    const result = await _reqAPI('proc_store_view.php', data);
    return result;
  },
  _getAllMenu: async data => {
    const result = await _reqAPI('proc_item_list.php', data);
    return result;
  },
  _getTopMenu: async data => {
    const result = await _reqAPI('proc_item_list_main.php', data);
    return result;
  },
  _getServiceTime: async data => {
    const result = await _reqAPI('proc_store_service_time.php', data);
    return result;
  },
  _getMenuDetail: async data => {
    const result = await _reqAPI('proc_item_detail.php', data);
    return result;
  },
};
