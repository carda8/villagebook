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
    data.encodeJson = true;
    // console.log('transformRequest', data);
    const jwt_data = jwtEncode(data, SECRETKEY);
    const result = formFormatter({
      secretKey: SECRETKEY,
      jwt_data: jwt_data,
    });
    console.log('transform jwt data', result);
    return result;
  },

  transformResponse: data => {
    if (data) {
      // console.log('## ORIGIN API RES DATA ::', data);
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
        const parsedData = JSON.parse(data);
        if (LOGON) {
          console.log('API Error :::', error);
          console.log('API ErrorData :::', data);
        }
        return parsedData;
      }
    }
  },
});

export const ImageAPI = axios.create({
  baseURL,
  timeout: 5000,
  timeoutErrorMessage: '###### IMAGE API REQ/REP TIMEOUT',
  headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'},

  transformRequest: (data, headers) => {
    data.encodeJson = true;
    let copyData = Object.assign({}, data);
    if (copyData.mt_image1) delete copyData.mt_image1;

    let imageResultObject = {};

    if (data.mt_image1) {
      imageResultObject['mt_image1'] = data.mt_image1;
    }
    console.log('Imgae Obj', imageResultObject);
    const jwt_data = jwtEncode(copyData, SECRETKEY);

    const result = formFormatter({
      secretKey: SECRETKEY,
      jwt_data: jwt_data,
      ...imageResultObject,
    });
    console.log('transform jwt data', result);
    return result;
  },

  transformResponse: data => {
    if (data) {
      // console.log('## ORIGIN API RES DATA ::', data);
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
        const parsedData = JSON.parse(data);
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
