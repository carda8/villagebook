import axios from 'axios';
import {baseURL, SECRETKEY} from '@env';
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
    const jwt_data = jwtEncode(data, SECRETKEY);
    const result = formFormatter({
      encodeJson: true,
      secretKey: SECRETKEY,
      jwt_data: jwt_data,
    });
    return result;
  },
  // result: responseData.encodeJson.resultItem.result,
  // msg: responseData.encodeJson.resultItem.message,
  // data: jwtDecodeData.data,
  transformResponse: data => {
    try {
      const parsedData = JSON.parse(data);
      const resData = parsedData.encodeJson;
      // if (LOGON) console.log('API Result Success :::\n', resData);
      return {
        result: resData.resultItem.result,
        msg: resData.resultItem.message,
        data: resData,
        origin: parsedData,
      };
    } catch (error) {
      if (LOGON) {
        console.log('API Error :::', error);
        console.log('API ErrorData :::', data);
      }

      return data;
    }
  },
});
