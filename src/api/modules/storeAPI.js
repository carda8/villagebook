import {_reqAPI} from '../apiModule';

export default {
  _getStoreInfo: async data => {
    const result = await _reqAPI('proc_store_view.php', data);
    return result;
  },
};
