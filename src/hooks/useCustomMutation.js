import {Alert} from 'react-native';
import {useMutation} from 'react-query';
import authAPI from '../api/modules/authAPI';
import storeAPI from '../api/modules/storeAPI';
import {customAlert} from '../component/CustomAlert';

export const useuseCustomMutation = () => {
  //Auth
  const mutateFindId = useMutation(authAPI._findId, {
    onSuccess: e => {
      if (e.result === 'false') {
        Alert.alert('알림', `${e.msg}`);
        return e;
      } else {
        Alert.alert(
          '아이디 찾기',
          `회원님의 아이디는\n"${e.data.arrItems.mt_id}" 입니다`,
        );
        return e;
      }
    },
  });

  const mutateSendCode = useMutation(authAPI._sendCode, {
    onSuccess: e => {
      if (e.result === 'false') {
        Alert.alert('알림', `${e.msg}`);
        return e;
      } else {
        Alert.alert(
          '알림',
          `인증번호가 발송 되었습니다.\n받은 번호를 입력 후 인증확인을 해주세요.`,
        );
        return e;
      }
    },
  });

  //Store
  const mutateTopMenu = useMutation(storeAPI._getTopMenu, {
    onSuccess: e => {
      console.log('mutateTopMenu', e);
      // customAlert('')
      return e;
    },
  });

  const mutateAllMunu = useMutation(storeAPI._getAllMenu, {
    onSuccess: e => {
      console.log('mutateAllMunu', e);
      // customAlert('')
      return e;
    },
  });

  const mutateStoreInfo = useMutation(storeAPI._getStoreInfo, {
    onSuccess: e => {
      console.log('mutateStoreInfo', e);
      return e;
    },
  });

  const mutateServiceTime = useMutation(storeAPI._getServiceTime, {
    onSuccess: e => {
      console.log('mutateStoreInfo', e);
      return e;
    },
  });

  const mutateMenuDetail = useMutation(storeAPI._getMenuDetail, {
    onSuccess: e => {
      console.log('mutateMenuDetail', e);
      return e;
    },
  });

  return {
    mutateFindId,
    mutateSendCode,
    mutateTopMenu,
    mutateStoreInfo,
    mutateAllMunu,
    mutateServiceTime,
    mutateMenuDetail,
  };
};
