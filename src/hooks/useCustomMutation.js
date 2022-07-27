import {Alert} from 'react-native';
import {useMutation} from 'react-query';
import authAPI from '../api/modules/authAPI';
import cartAPI from '../api/modules/cartAPI';
import mainAPI from '../api/modules/mainAPI';
import paymentAPI from '../api/modules/paymentAPI';
import storeAPI from '../api/modules/storeAPI';
import {customAlert} from '../component/CustomAlert';

export const useCustomMutation = () => {
  //Main
  const mutateSignIn = useMutation(authAPI._submitForm, {
    onSettled: e => {
      // Alert.alert('알림', `인증번호가 발송 되었습니다.`);
      console.log('mutateSignIn', e);
      return e;
    },
  });

  const mutateGetLifeStyle = useMutation(mainAPI._getLifeStyleList, {
    onSettled: e => {
      console.log('mutateGetLifeStyle', e);
      // customAlert('')
      return e;
    },
  });

  const mutateGetLifeStyleStoreInfo = useMutation(
    mainAPI._getLifeStyleStoreInfo,
    {
      onSettled: e => {
        console.log('mutateGetLifeStyleStoreInfo', e);
        // customAlert('')
        return e;
      },
    },
  );

  const mutateOrderHistory = useMutation(mainAPI._getOrderHistory, {
    onSettled: e => {
      console.log('mutateOrderHistory', e);
      return e;
    },
  });

  const mutateOrderDetail = useMutation(mainAPI._getOrderDetail, {
    onSettled: e => {
      console.log('mutateOrderDetail', e);
      return e;
    },
  });

  const mutateWriteReveiw = useMutation(mainAPI._writeReview, {
    onSettled: e => {
      console.log('mutateWriteReveiw', e);
      return e;
    },
  });

  //Auth
  const mutateSNSlogin = useMutation(authAPI._snsLogin, {
    onSettled: e => {
      console.log('e', e);
    },
  });

  const mutateFindId = useMutation(authAPI._findId, {
    onSettled: e => {
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
    onSettled: e => {
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
    onSettled: e => {
      console.log('mutateTopMenu', e);
      // customAlert('')
      return e;
    },
  });

  const mutateAllMunu = useMutation(storeAPI._getAllMenu, {
    onSettled: e => {
      console.log('mutateAllMunu', e);
      // customAlert('')
      return e;
    },
  });

  const mutateStoreInfo = useMutation(storeAPI._getStoreInfo, {
    onSettled: e => {
      console.log('mutateStoreInfo', e);
      return e;
    },
  });

  const mutateServiceTime = useMutation(storeAPI._getServiceTime, {
    onSettled: e => {
      console.log('mutateServiceTime', e);
      return e;
    },
  });

  const mutateMenuDetail = useMutation(storeAPI._getMenuDetail, {
    onSettled: e => {
      console.log('mutateMenuDetail', e);
      return e;
    },
  });

  const mutateDeliveryFee = useMutation(storeAPI._getDeliveryFee, {
    onSettled: e => {
      console.log('mutateDeliveryFee', e);
      return e;
    },
  });

  const mutateFinishTransaction = useMutation(paymentAPI._finishTransaction, {
    onSettled: e => {
      console.log('mutateFinishTransaction', e);
      return e;
    },
  });

  const mutateSaveItemInCart = useMutation(cartAPI._saveItemInCart, {
    onSettled: e => {
      console.log('mutateSaveItemInCart', e);
      return e;
    },
  });

  const mutateGetLikeList = useMutation(storeAPI._getLikeList, {
    onSettled: e => {
      console.log('mutateGetLikeList', e);
      return e;
    },
  });

  const mutateSetLikeStore = useMutation(storeAPI._setLikeStore, {
    onSettled: e => {
      console.log('mutateSetLikeStore', e);
      return e;
    },
  });

  const mutateGetCoupon = useMutation(mainAPI._getCoupon, {
    onSettled: e => {
      console.log('mutateGetCoupon', e);
      return e;
    },
  });

  const mutateGetUseInfo = useMutation(mainAPI._getUseInfo, {
    onSettled: e => {
      console.log('mutateGetUseInfo', e);
      return e;
    },
  });

  const mutateGetReview = useMutation(mainAPI._getStoreReview, {
    onSettled: e => {
      console.log('mutateGetReview', e);
      return e;
    },
  });

  return {
    mutateSignIn,
    mutateSNSlogin,
    mutateFindId,
    mutateSendCode,
    mutateTopMenu,
    mutateStoreInfo,
    mutateAllMunu,
    mutateServiceTime,
    mutateMenuDetail,
    mutateDeliveryFee,
    mutateFinishTransaction,
    mutateSaveItemInCart,
    mutateOrderHistory,
    mutateOrderDetail,
    mutateSetLikeStore,
    mutateGetLikeList,
    mutateGetCoupon,
    mutateGetUseInfo,
    mutateGetReview,
    mutateGetLifeStyle,
    mutateGetLifeStyleStoreInfo,
    mutateWriteReveiw,
  };
};
