import {View, Text} from 'react-native';
import React from 'react';
import IMP from 'iamport-react-native';
import Loading from '../../component/Loading';
import axios from 'axios';
import {IAM_API_KEY, IAM_SECRET} from '@env';
import {Errorhandler} from '../../config/ErrorHandler';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import {useSelector} from 'react-redux';

const PaymentMain = ({navigation, route}) => {
  const isDelivery = route.params?.isDelivery;
  const orderForm = route.params?.orderForm;
  const totalSellPrice = route.params?.totalSellPrice;

  const {mutateFinishTransaction} = useCustomMutation();
  const cartStore = useSelector(state => state.cartReducer);
  //   const {userInfo} = useSelector(state => state.userReducer);

  const _finishTransaction = paymentForm => {
    const data = {
      jumju_id: cartStore.currentStoreCode.jumju_id,
      jumju_code: cartStore.currentStoreCode.code,
      //   mt_id: userInfo.mt_id,
      //   mt_name: userInfo.nickname,
      od_method: isDelivery ? 'delivery' : 'wrap',
      od_pay_method: 'card',
      od_zip: orderForm.od_zip,
      od_addr1: orderForm.od_addr1,
      od_addr2: orderForm.od_addr2,
      od_addr3: orderForm.od_addr3,
      od_addr_jibeon: orderForm.od_addr_jibeon,

      od_hp: orderForm.od_hp,
      od_to_officer: orderForm.od_to_officer,
      od_to_seller: orderForm.od_to_seller,
      od_no_spoon: orderForm.od_no_spoon,
      od_safety_chk: orderForm.od_safety_chk,
      od_send_cost: orderForm.od_send_cost,
      od_send_cost2: orderForm.od_send_cost2,

      od_receipt_point: orderForm.od_receipt_point,
      od_takeout_discount: orderForm.od_takeout_discount,
      od_coupon_id_system: '',
      od_coupon_id_store: '',
      od_coupon_price_system: '',
      od_coupon_price_store: '',
      od_total_sell_price: totalSellPrice,
      od_total_order_price: totalSellPrice,
      od_pg_data: paymentForm,
      od_menu_data: cartStore.savedItem.savedItems,
    };
    console.log('data', data);
    mutateFinishTransaction.mutate(data);
  };

  const _getIamInfo = async res => {
    try {
      const {imp_uid, merchant_uid} = res;

      const getToken = await axios.post(
        'https://api.iamport.kr/users/getToken',
        {
          imp_key: IAM_API_KEY,
          imp_secret: IAM_SECRET,
        },
        {headers: {'Content-Type': 'application/json'}},
      );

      const {access_token} = getToken.data.response;
      console.log('getToken data', getToken.data);

      const getPaymentData = await axios.get(
        `https://api.iamport.kr/payments/${imp_uid}`,
        {
          headers: {Authorization: access_token},
        },
      );

      const paymentData = getPaymentData.data.response; // 조회한 결제 정보

      console.log('paymentData', paymentData);

      const paymentForm = {
        od_pg_tid: paymentData.pg_tid,
        od_pg_apply_num: paymentData.apply_num,
        od_pg_card_name: paymentData.card_name,
        od_pay_method: paymentData.pay_method,
        od_pg_card_code: paymentData.card_code,
        od_pg_card_number: paymentData.card_number,
      };
      console.log('paymentForm', paymentForm);
      _finishTransaction(paymentForm);
    } catch (e) {
      Errorhandler(e);
      console.error('PaymentMain', e);
    }
  };

  const data = {
    pg: 'html5_inicis',
    pay_method: 'card',
    name: '아임포트 결제데이터 분석',
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: '100',
    buyer_name: '홍길동',
    buyer_tel: '01012345678',
    buyer_email: 'example@naver.com',
    buyer_addr: '서울시 강남구 신사동 661-16',
    buyer_postcode: '06018',
    app_scheme: 'example',
    // [Deprecated v1.0.3]: m_redirect_url
  };

  const _callback = res => {
    _getIamInfo(res);
    console.log('res', res);
    // navigation.navigate('OrderFinish', res);
  };

  return (
    <IMP.Payment
      userCode={'imp72538339'} // 가맹점 식별코드
      //tierCode={'AAA'} // 티어 코드: agency 기능 사용자에 한함
      loading={<Loading />} // 로딩 컴포넌트
      data={data} // 결제 데이터
      callback={_callback} // 결제 종료 후 콜백
    />
  );
};

export default PaymentMain;
