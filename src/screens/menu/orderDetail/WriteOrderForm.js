import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../../styles/commonStyle';
import Header from '../../../component/Header';
import TextBold from '../../../component/text/TextBold';
import TextRegular from '../../../component/text/TextRegular';
import colors from '../../../styles/colors';
import DividerL from '../../../component/DividerL';
import {useSelector} from 'react-redux';
import {replaceString} from '../../../config/utils/Price';
import Loading from '../../../component/Loading';
import ImageCover from '../../../component/ImageCover';
import {customAlert} from '../../../component/CustomAlert';
import PaymentList from '../../../config/PaymentList';
import {or, set} from 'react-native-reanimated';
import {useCustomMutation} from '../../../hooks/useCustomMutation';

const WriteOrderForm = ({navigation, route}) => {
  const addData = route.params?.addData;
  const {userInfo} = useSelector(state => state.authReducer);
  const cartStore = useSelector(state => state.cartReducer);
  const {storeCoupon, systemCoupon} = useSelector(state => state.couponReducer);
  const {deliveryType} = useSelector(state => state.deliveryReducer);
  const {deliveryData, paymentMethod} = useSelector(
    state => state.paymentReducer,
  );

  const {mutateGetCouponPoint, mutateGetCoupon, mutateGetAddress} =
    useCustomMutation();

  const currentStore = cartStore.currentStoreCode;
  // const {deliveryType === 0} = useSelector(state => state.paymentReducer);
  const [couponPoint, setCouponPoint] = useState([]);
  const [agreement, setAgreement] = useState(false);
  const [orderForm, setOrderForm] = useState({
    jumju_id: cartStore.savedItem?.savedStoreCode.jumju_id,
    jumju_code: cartStore.savedItem?.savedStoreCode.code,
    mt_id: userInfo.mt_id,
    mt_name: userInfo.mt_nickname ?? userInfo.mt_name,

    od_zip: addData?.zonecode,
    od_addr1: addData?.address ?? '',
    od_addr2: '',
    od_addr3: '',
    od_addr_jibeon: addData?.jibunAddress,
    od_hp: userInfo.mt_hp,
    od_to_officer: '', // 가게 사장님
    od_to_seller: '', //배달 기사님
    od_forhere_num: '',
    od_safety_chk: true,
    od_send_cost: deliveryType === 0 ? deliveryData.send_cost : 0,
    od_send_cost2: deliveryType === 0 ? deliveryData.send_cost2 : 0,
    od_receipt_point: 0,
    od_takeout_discount:
      deliveryType === 0 ? '0' : deliveryData.take_out_discount,

    od_no_spoon: false,
    od_coupon_id_system: '', //관리자 발행 쿠폰번호
    od_coupon_id_store: '', //점주 발행 쿠폰번호 GQ2B-J4VZ-KJRQ-C1H4
    od_coupon_price_system: 0, //관리자 뱔행 쿠폰금액
    od_coupon_price_store: 0, //점주 발생 쿠폰금액

    // od_total_order_price: 0,
    // od_total_sell_price: 0,
    // od_pg_data: '', //pg 데이터
    // od_menu_data: '', //메뉴 데이터
  });

  const _calcSummary = () => {
    let calcTotal = 0;
    cartStore.savedItem.savedItems.map((item, index) => {
      calcTotal += item.totalPrice;
    });
    if (deliveryType !== 0)
      calcTotal = calcTotal - deliveryData.take_out_discount;
    else {
      calcTotal =
        calcTotal +
        (Number(deliveryData.send_cost) + Number(deliveryData.send_cost2)) -
        (Number(orderForm.od_coupon_price_store) +
          Number(orderForm.od_coupon_price_system) +
          Number(orderForm.od_receipt_point));
    }
    // console.log('ORDER FORM', orderForm);
    console.log('delivery', deliveryData);
    // console.log('calc totla', calcTotal);

    return calcTotal;
  };

  const _calcLastPrice = () => {
    // const totalItemPrice = _calcSummary();
    // let temp = 0;
    let calcTotal = 0;
    cartStore.savedItem.savedItems.map((item, index) => {
      calcTotal += item.totalPrice;
    });
    return calcTotal;
    // temp =
    //   totalItemPrice -
    //   (Number(orderForm.od_coupon_price_store) +
    //     Number(orderForm.od_coupon_price_system) +
    //     Number(orderForm.od_send_cost) +
    //     Number(orderForm.od_send_cost2));
    // return temp;
  };

  const _getAddr = () => {
    const data = {
      mt_id: userInfo.mt_id,
    };

    mutateGetAddress.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true') {
          const data = e.data.arrItems[0];
          setOrderForm({
            ...orderForm,
            od_addr1: data.ad_addr1,
            od_addr2: data.ad_addr2,
            od_addr3: data.ad_addr3,
            od_zip: data.ad_zip,
          });
          console.log('data', data);
        }
        console.log('e', e);
      },
    });
  };

  const _getCouponPoint = () => {
    const data = {
      mt_id: userInfo.mt_id,
      jumju_id: cartStore.currentStoreCode.jumju_id,
      jumju_code: cartStore.currentStoreCode.code,
    };

    mutateGetCouponPoint.mutate(data, {
      onSuccess: e => {
        if (e.result === 'true') {
          setCouponPoint(e.data.arrItems);
        } else setCouponPoint([]);
        console.log('_getCouponPoint', e);
      },
    });
  };

  const _usePointAll = () => {
    if (couponPoint.mb_point == 0)
      return customAlert('알림', '사용가능한 포인트가 없습니다.');
    else setOrderForm({...orderForm, od_receipt_point: couponPoint.mb_point});
    // if (couponPoint.mb_point > 0 && couponPoint.mb_point < 500)
    //   return customAlert('알림', '500포인트 이상 부터 사용가능합니다.');
  };

  const _getCouponList = type => {
    const data = {
      mt_id: userInfo.mt_id,
      item_count: '0',
      limit_count: '10',
      jumju_id: cartStore.currentStoreCode.jumju_id,
      jumju_code: cartStore.currentStoreCode.code,
      cp_gubun: type,
    };
    const storeInfo = {
      mb_id: cartStore.currentStoreCode.jumju_id,
      mb_jumju_code: cartStore.currentStoreCode.code,
    };
    console.log('data', data);

    mutateGetCoupon.mutate(data, {
      onSettled: e => {
        navigation.navigate('PaymentMethod', {
          storeInfo: storeInfo,
          storeCoupon: e.data.arrItems ?? [],
          useCoupon: true,
          select: true,
          type: type,
        });
      },
    });
  };

  useEffect(() => {
    if (addData) {
      setOrderForm({
        ...orderForm,
        od_addr1: addData.address,
        od_zip: addData.zonecode,
        od_addr_jibeon: addData.jibunAddress ?? addData.autoJibunAddress,
      });
    }
  }, [route.params]);

  useEffect(() => {
    _getAddr();
    _getCouponPoint();
  }, []);

  useEffect(() => {
    setOrderForm({
      ...orderForm,
      od_coupon_id_store: storeCoupon?.cp_id ?? '',
      od_coupon_id_system: systemCoupon?.cp_id ?? '',
      od_coupon_price_store: storeCoupon?.cp_price ?? '',
      od_coupon_price_system: systemCoupon?.cp_price ?? '',
    });
  }, [storeCoupon, systemCoupon]);

  useEffect(() => {
    if (paymentMethod !== PaymentList.card) {
      setOrderForm({...orderForm, od_receipt_point: 0});
    }
  }, [paymentMethod]);

  const _checkForm = () => {
    if (deliveryType === 0 && !orderForm.od_addr1 && !orderForm.od_addr2) {
      return customAlert('알림', '배달정보를 확인해주세요.');
    }
    if (!paymentMethod) {
      return customAlert('알림', '결제방법을 선택해주세요..');
    }
    if (Number(orderForm.od_forhere_num) < 2 && deliveryType === 2) {
      return customAlert('알림', '식사인원은 최소 2명 이상입니다.');
    }
    // setOrderForm({
    //   ...orderForm,
    //   od_total_order_price: _calcSummary(),
    //   od_total_sell_price: _calcLastPrice(),
    // });
    console.log('orderForm', orderForm);
    navigation.navigate('PaymentMain', {
      deliveryType,
      orderForm,
      totalSellPrice: _calcLastPrice(),
      totalOrderPrice: _calcSummary(),
    });
  };
  // return <Loading />;
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'주문하기'} navigation={navigation} />
      <ScrollView>
        {/* START 배달 정보, 요청 사항 */}
        <View style={{padding: 22}}>
          <View style={{flexDirection: 'row', alignItems: 'baseline', flex: 1}}>
            <TextBold style={{fontSize: 16}}>
              {deliveryType === 0
                ? '배달정보'
                : deliveryType === 1
                ? '포장'
                : '먹고가기'}
            </TextBold>
            {deliveryType === 0 && (
              <TextRegular style={{color: '#D91313', fontSize: 13}}>
                (주소가 맞는지 꼭 확인 후 주문해 주세요)
              </TextRegular>
            )}
          </View>

          {deliveryType === 0 && (
            <>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TextInput
                  style={{...styles.inputContainer, marginRight: 10}}
                  editable={false}
                  placeholder={'주소 입력'}
                  value={orderForm.od_addr1 ?? null}
                />
                <Pressable
                  onPress={() => {
                    navigation.navigate('AddressSearch', {
                      fromWriteOrder: true,
                    });
                  }}
                  style={{
                    ...styles.infoBtn,
                  }}>
                  <TextBold style={{fontSize: 16, color: 'white'}}>
                    주소변경
                  </TextBold>
                </Pressable>
              </View>

              <TextInput
                style={{...styles.inputContainer, marginVertical: 10}}
                placeholder={'상세주소 입력'}
                value={orderForm.od_addr2 + orderForm.od_addr3}
                onChangeText={e => {
                  setOrderForm({...orderForm, od_addr2: e});
                }}
              />
            </>
          )}
          {deliveryType !== 0 && (
            <View style={{marginVertical: 10}}>
              <TextBold>주문자 휴대폰 번호</TextBold>
            </View>
          )}

          <View style={{flexDirection: 'row'}}>
            <TextInput
              editable={false}
              style={{...styles.inputContainer}}
              placeholder={'휴대폰 번호(숫자만 입력)'}
              defaultValue={userInfo.mt_hp}
            />
            {/* <Pressable
              // onPress={()=>customAlert()}
              style={{
                ...styles.infoBtn,
              }}>
              <TextBold style={{fontSize: 16, color: 'white'}}>변경</TextBold>
            </Pressable> */}
          </View>

          {deliveryType === 2 && (
            <>
              <View style={{marginVertical: 10}}>
                <TextBold>식사 인원 입력</TextBold>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  value={orderForm.od_forhere_num}
                  onChangeText={e => {
                    let temp = e;
                    temp = temp.replace(/[^0-9]/gi, '');
                    setOrderForm({...orderForm, od_forhere_num: temp});
                  }}
                  style={{...styles.inputContainer, marginRight: 10}}
                  keyboardType={'numeric'}
                  placeholder={'식사 인원 입력'}
                  maxLength={4}
                />
                <View style={{position: 'absolute', right: 25}}>
                  <TextBold style={{color: colors.fontColorA2}}>명</TextBold>
                </View>
              </View>
            </>
          )}

          {/* 안심번호 */}
          {/* <Pressable
            hitSlop={10}
            onPress={() => setSafeNumber(!safeNumber)}
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
            <Image
              source={
                safeNumber
                  ? require('~/assets/top_ic_map_on.png')
                  : require('~/assets/top_ic_map_off.png')
              }
              style={{width: 20, height: 20, marginRight: 10}}
            />
            <TextRegular style={{color: colors.fontColorA}}>
              안심번호로 주문
            </TextRegular>
          </Pressable> */}

          <View style={{marginTop: 40}}>
            <TextBold style={{fontSize: 16}}>요청사항</TextBold>
            <View style={{marginTop: 10}}>
              <TextBold style={{marginVertical: 5}}>가게 사장님에게</TextBold>
              <TextInput
                placeholder={
                  currentStore.category === 'food'
                    ? '예) 오이 뺴주세요'
                    : '요청사항을 적어주세요'
                }
                value={orderForm.od_to_seller}
                onChangeText={e =>
                  setOrderForm({...orderForm, od_to_seller: e})
                }
                style={{...styles.inputContainer, backgroundColor: 'white'}}
              />
            </View>
            {deliveryType === 0 && (
              <>
                <TextBold style={{marginVertical: 5}}>배달 기사님에게</TextBold>
                <TextInput
                  placeholder={
                    currentStore.category === 'food'
                      ? '예) 조심히 와주세요'
                      : '요청사항을 적어주세요'
                  }
                  value={orderForm.od_to_officer}
                  onChangeText={e =>
                    setOrderForm({...orderForm, od_to_officer: e})
                  }
                  style={{...styles.inputContainer, backgroundColor: 'white'}}
                />
              </>
            )}
            {currentStore.category === 'food' && (
              <Pressable
                hitSlop={10}
                onPress={() =>
                  setOrderForm({
                    ...orderForm,
                    od_no_spoon: !orderForm.od_no_spoon,
                  })
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Image
                  source={
                    orderForm.od_no_spoon
                      ? require('~/assets/top_ic_map_on.png')
                      : require('~/assets/top_ic_map_off.png')
                  }
                  style={{width: 20, height: 20, marginRight: 10}}
                />
                <View style={{flex: 1}}>
                  <TextRegular style={{color: 'forestgreen'}}>
                    일회용 수저, 포크 안주셔도 돼요
                  </TextRegular>
                  <TextRegular style={{color: 'forestgreen'}}>
                    (환경보호를 위해 필요 없을 시 꼭 체크 부탁드려요)
                  </TextRegular>
                </View>
              </Pressable>
            )}
          </View>
        </View>
        {/* END 배달 정보, 요청 사항 */}

        <DividerL />
        {/* START 결제 방법 */}
        <View style={{padding: 22}}>
          <TextBold style={{fontSize: 16}}>결제방법</TextBold>
          <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              onPress={() => navigation.navigate('PaymentMethod')}
              style={{
                flex: 1,
                height: 50,
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 10,
                borderColor: colors.primary,
                paddingHorizontal: 12,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TextRegular style={{color: colors.fontColorA2}}>
                {paymentMethod ? paymentMethod : '결제방법을 선택해주세요'}
              </TextRegular>
              <Pressable
                onPress={() => navigation.navigate('PaymentMethod')}
                style={{
                  width: 50,
                  height: 26,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                }}>
                <TextRegular style={{color: 'white'}}>변경</TextRegular>
              </Pressable>
            </Pressable>
          </Pressable>
          {paymentMethod !== PaymentList.card && (
            <View style={{marginTop: 10}}>
              <TextRegular style={{color: colors.fontMain2, fontSize: 12}}>
                - 만나서 결제는 포인트, 쿠폰 사용이 불가합니다.
              </TextRegular>
            </View>
          )}
          <TextRegular></TextRegular>
          {deliveryType === 0 && paymentMethod === PaymentList.card && (
            <>
              {/* 포인트 사용 */}
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TextBold style={{fontSize: 16}}>포인트 사용</TextBold>
                  <TextRegular style={{color: colors.fontColorA}}>
                    보유 포인트 : {couponPoint?.mb_point}
                  </TextRegular>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Pressable
                    onPress={() => {
                      _usePointAll();
                    }}
                    style={{
                      ...styles.infoBtn,
                    }}>
                    <TextBold style={{fontSize: 16, color: 'white'}}>
                      모두사용
                    </TextBold>
                  </Pressable>
                  <TextInput
                    editable={couponPoint.mb_point > 0}
                    value={
                      String(orderForm.od_receipt_point) == 0
                        ? ''
                        : String(orderForm.od_receipt_point)
                    }
                    onChangeText={e =>
                      setOrderForm({...orderForm, od_receipt_point: e})
                    }
                    keyboardType="numeric"
                    style={{...styles.inputContainer, marginLeft: 10}}
                    placeholder={
                      couponPoint.mb_point == 0
                        ? '사용가능한 포인트가 없습니다'
                        : '500포인트 부터 사용 가능'
                    }
                  />
                </View>
              </View>
              {/* 쿠폰 사용 */}
              <View style={{marginTop: 20}}>
                <TextBold style={{fontSize: 16}}>쿠폰 사용</TextBold>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Pressable
                    onPress={
                      () => {
                        _getCouponList('store');
                        // customAlert('준비중', '현재 준비중인 기능입니다.');
                      }
                      // navigation.navigate('PaymentMethod', {useCoupon: true})
                    }
                    style={{
                      ...styles.infoBtn,
                    }}>
                    <TextBold style={{fontSize: 16, color: 'white'}}>
                      쿠폰선택
                    </TextBold>
                  </Pressable>
                  <TextInput
                    editable={false}
                    value={
                      storeCoupon.cp_price && `${'- ' + storeCoupon.cp_price}`
                    }
                    style={{...styles.inputContainer, marginLeft: 10}}
                  />
                </View>
              </View>

              <View style={{marginTop: 20}}>
                <TextBold style={{fontSize: 16}}>동네북 쿠폰 사용</TextBold>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Pressable
                    onPress={
                      () => {
                        _getCouponList('system');
                        // customAlert('준비중', '현재 준비중인 기능입니다.');
                      }
                      // navigation.navigate('PaymentMethod', {useCoupon: true})
                    }
                    style={{
                      ...styles.infoBtn,
                    }}>
                    <TextBold style={{fontSize: 16, color: 'white'}}>
                      쿠폰선택
                    </TextBold>
                  </Pressable>
                  <TextInput
                    editable={false}
                    value={
                      systemCoupon.cp_price && `${'- ' + systemCoupon.cp_price}`
                    }
                    style={{...styles.inputContainer, marginLeft: 10}}
                  />
                  {console.log('##########', storeCoupon, systemCoupon)}
                </View>
              </View>
            </>
          )}
        </View>
        {/* END 결제방법 */}
        <DividerL />
        {/* START 결제금액 */}
        <View style={{padding: 22}}>
          <TextBold style={{fontSize: 16}}>결제금액</TextBold>
          <View style={{marginTop: 15}}>
            <View style={{...styles.paymentText}}>
              <TextRegular style={{color: colors.fontColorA}}>
                주문금액
              </TextRegular>
              <TextRegular style={{}}>
                {replaceString(_calcLastPrice())}원
              </TextRegular>
            </View>
            {deliveryType === 0 && (
              <>
                <View style={{...styles.paymentText}}>
                  <TextRegular style={{color: colors.fontColorA}}>
                    배달팁
                  </TextRegular>
                  <TextRegular style={{}}>
                    {replaceString(deliveryData.send_cost)}원
                  </TextRegular>
                </View>

                <View style={{...styles.paymentText}}>
                  <TextRegular style={{color: colors.fontColorA}}>
                    추가배달팁
                  </TextRegular>
                  <TextRegular style={{}}>
                    {replaceString(deliveryData.send_cost2)}원
                  </TextRegular>
                </View>
              </>
            )}
            {deliveryType !== 0 && (
              <View style={{...styles.paymentText}}>
                <TextRegular style={{color: colors.fontColorA}}>
                  {deliveryType === 2 ? '먹고가기 할인' : '포장할인'}
                </TextRegular>
                <TextRegular style={{}}>
                  -{deliveryData.take_out_discount}
                </TextRegular>
              </View>
            )}
            <View style={{...styles.paymentText}}>
              <TextRegular style={{color: colors.fontColorA}}>
                점주 쿠폰 할인
              </TextRegular>
              <TextRegular style={{}}>
                -{storeCoupon?.cp_price ?? 0}원
              </TextRegular>
            </View>
            <View style={{...styles.paymentText}}>
              <TextRegular style={{color: colors.fontColorA}}>
                동네북 쿠폰 할인
              </TextRegular>
              <TextRegular style={{}}>
                -{systemCoupon?.cp_price ?? 0}원
              </TextRegular>
            </View>
            {/* 
            <View style={{...styles.paymentText}}>
              <TextRegular style={{color: colors.fontColorA}}>
                포장할인
              </TextRegular>
              <TextRegular style={{}}>-{'0'}원</TextRegular>
            </View> */}

            <View style={{...styles.paymentText, marginBottom: 20}}>
              <TextRegular style={{color: colors.fontColorA}}>
                포인트 사용
              </TextRegular>
              <TextRegular style={{}}>
                -{orderForm.od_receipt_point}원
              </TextRegular>
            </View>
          </View>
          <View style={{height: 1, backgroundColor: colors.borderColor}} />

          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextBold style={{fontSize: 16}}>총 결제금액</TextBold>
            <TextBold style={{fontSize: 16}}>
              {replaceString(_calcSummary())}
            </TextBold>
          </View>

          <Pressable
            hitSlop={10}
            onPress={() => setAgreement(!agreement)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={
                agreement
                  ? require('~/assets/top_ic_map_on.png')
                  : require('~/assets/top_ic_map_off.png')
              }
              style={{width: 20, height: 20, marginRight: 10}}
            />
            <View style={{flex: 1}}>
              <TextRegular style={{color: 'forestgreen'}}>
                위 내용을 확인하였으며 결제에 동의합니다.
              </TextRegular>
            </View>
          </Pressable>
          {/* 결제하기 버튼 */}
          <Pressable
            disabled={!agreement}
            onPress={() => {
              _checkForm();
              // navigation.navigate('OrderFinish');
            }}
            style={{
              height: 60,
              backgroundColor: agreement ? colors.primary : colors.borderColor,
              borderRadius: 5,
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextBold style={{fontSize: 18, color: 'white'}}>
              {replaceString(_calcSummary())}원 결제하기
            </TextBold>
          </Pressable>
          {/* END 결제금액 */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WriteOrderForm;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    backgroundColor: colors.inputBoxBG,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  infoBtn: {
    width: 100,
    borderRadius: 5,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentText: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
