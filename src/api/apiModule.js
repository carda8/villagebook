import {Errorhandler} from '../config/ErrorHandler';
import {API} from './API';

export const _reqAPI = async (url, data) => {
  const apiResult = await API.post(url, data)
    .then(result => {
      console.log('## API REQ FINISH ## REQUESTED URL ::', url);
      console.log('## RES DATA ::', result);
      return result.data;
    })
    .catch(e => {
      Errorhandler(e);
      console.log(`## REQ ERROR URL :: ${url}`);
      console.error(e);
      return e;
    });

  return apiResult;
};
