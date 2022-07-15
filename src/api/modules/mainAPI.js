import {_reqAPI} from '../apiModule';

export default {
  _getStoreList: async data => {
    const result = await _reqAPI('proc_store_list.php', data);
    return result;
  },
  _getCategory: async data => {
    const result = await _reqAPI('proc_category_list.php', data);
    return result;
  }
};
