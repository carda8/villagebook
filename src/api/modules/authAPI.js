import {API} from '../API';
import {_reqAPI} from '../apiModule';

export default {
  _login: async data => {
    const result = await _reqAPI('proc_member_login.php', data);
    return result;
  },
  _submitForm: async data => {
    const result = await _reqAPI('proc_member_join.php', data);
    return result;
  },
  _checkId: async data => {
    const result = await _reqAPI('proc_member_id_chk.php', data);
    return result;
  },
  _sendCode: async data => {
    const result = await _reqAPI('proc_member_sms_send.php', data);
    return result;
  },
};
