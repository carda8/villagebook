import axios from 'axios';
import {baseURL, SECRETKEY, APP_TOKEN, IAM_API_KEY, IAM_SECRET} from '@env';
import formFormatter from './formFormatter';
import jwtDecode from 'jwt-decode';
import jwtEncode from 'jwt-encode';

const LOGON = true;
export const API = axios.create({
  baseURL,
  timeout: 5000,
  timeoutErrorMessage: '###### API REQ/REP TIMEOUT',
  headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'},

  transformRequest: (data, headers) => {
    data.mt_app_token = APP_TOKEN;
    data.encodeJson = true;
    console.log('transformRequest', data);
    const jwt_data = jwtEncode(data, SECRETKEY);
    const result = formFormatter({
      secretKey: SECRETKEY,
      jwt_data: jwt_data,
    });
    return result;
  },

  transformResponse: data => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        const resData = parsedData.encodeJson;
        return {
          result:
            resData?.resultItem.result ??
            jwtDecode(parsedData.jwt).resultItem.result,
          msg: resData?.resultItem.message ?? parsedData?.message,
          data: resData ?? jwtDecode(parsedData.jwt),
          origin: parsedData,
        };
      } catch (error) {
        if (LOGON) {
          console.log('API Error :::', error);
          console.log('API ErrorData :::', data);
        }
        return parsedData;
      }
    }
  },
});

export const IAM_API = axios.create({
  timeout: 5000,
  timeoutErrorMessage: '###### IAM_API REQ/REP TIMEOUT',
  headers: {'Content-Type': 'application/json'},
});
