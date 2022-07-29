import {View, Image, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../../styles/commonStyle';
import Header from '../../../component/Header';
import TextBold from '../../../component/text/TextBold';
import TextMedium from '../../../component/text/TextMedium';
import colors from '../../../styles/colors';
import TextRegular from '../../../component/text/TextRegular';
import OptionCount from '../OptionCount';
import DividerL from '../../../component/DividerL';
import CartButton from '../CartButton';
import {useDispatch, useSelector} from 'react-redux';
import {replaceString} from '../../../config/utils/Price';
import {removeItem, resetSavedItem} from '../../../store/reducers/CartReducer';
import {useCustomMutation} from '../../../hooks/useCustomMutation';
import Loading from '../../../component/Loading';
import {
  setDeliveryData,
  setIsDeliveryStore,
  setLastPrice,
} from '../../../store/reducers/PaymentReducer';
import Cart from './Cart';

const SummitOrder = ({navigation, route}) => {
  const {mutateDeliveryFee} = useCustomMutation();
  const cartStore = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();
  console.log('summit cart store', cartStore);
  console.log('item main option');
  console.log('summit route data', route.params);
  const [isDelivery, setIsDelivery] = useState(true);

  const _filterOption = prop => {
    console.log('props', prop);
    const temp = prop.main.option;
    console.log('temp', temp);
    let arr = [];

    temp.map((item, index) => {
      arr.push(item.name, ' : ', item.value, ', ');
      // console.log('temp', temp[index], prop.main.option[temp[index]].name);
    });

    return arr;
  };

  const _getTotalPrice = isSummit => {
    let temp = 0;
    cartStore.savedItem.savedItems.map((item, index) => {
      temp += item.totalPrice;
    });
    if (isSummit) {
      const DeliveryData = mutateDeliveryFee.data.data.arrItems[0];
      if (!isDelivery) {
        let calc = temp - DeliveryData.take_out_discount;
        return calc;
      } else {
        let calc = temp + DeliveryData.send_cost + DeliveryData.send_cost2;
        return replaceString(calc);
      }
    } else return replaceString(temp);
  };

  const _getDeliveryFee = () => {
    const data = {
      jumju_id: cartStore.currentStoreCode.jumju_id,
      jumju_code: cartStore.currentStoreCode.code,
      total_price: _getTotalPrice(),
    };
    console.log('data', data);
    mutateDeliveryFee.mutate(data);
  };

  useEffect(() => {
    _getDeliveryFee();
  }, []);

  useEffect(() => {
    if (mutateDeliveryFee.data?.arrItems) {
      dispatch(setDeliveryData(mutateDeliveryFee.data.data.arrItems[0]));
    }
  }, [mutateDeliveryFee.data]);

  if (cartStore.savedItem.savedItems.length === 0)
    return (
      <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
        <Header title={'카트'} navigation={navigation} />
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Image
            source={require('~/assets/no_cart.png')}
            style={{width: 300, height: 300}}
          />
        </View>
      </SafeAreaView>
    );

  if (!mutateDeliveryFee.data || mutateDeliveryFee.isLoading)
    return <Loading />;
  console.log('mutate data', mutateDeliveryFee.data);
  const DeliveryData = mutateDeliveryFee.data.data.arrItems[0];

  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'카트'} navigation={navigation} />
      {console.log('sumoder data', route.params)}
      <CartButton
        navigation={navigation}
        goTo={'OrderPage'}
        isDelivery={isDelivery}
        lastPrice={_getTotalPrice(true)}
        deliveryData={DeliveryData}
        data={route.params?.data}
      />
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View
          style={{
            paddingHorizontal: 22,
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <Image
            source={{uri: cartStore.storeLogoUrl}}
            style={{
              width: 130,
              height: 130,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.borderColor,
            }}
          />
          <View style={{marginVertical: 10}}>
            <TextMedium style={{fontSize: 18}}>
              {cartStore.currentStoreCode.storeName}
            </TextMedium>
          </View>
          {cartStore.savedItem.savedItems.map((item, index) => (
            <View
              key={index}
              style={{
                width: '100%',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                borderColor: colors.borderColor,
                marginBottom: 10,
                flex: 1,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <View style={{flex: 1}}>
                  <TextBold>
                    {item.main.menuName}
                    {'  '}
                  </TextBold>
                  <TextRegular style={{color: colors.fontColorA}}>
                    {_filterOption(item)}
                  </TextRegular>
                  {/* <TextRegular>{item.main.option}</TextRegular> */}
                </View>
                <Pressable
                  hitSlop={12}
                  onPress={() => {
                    // const temp = cartStore.savedItem.savedItems.filter(
                    //   (item, index2) => index2 !== index,
                    // );
                    // console.log('temp arr', temp);
                    dispatch(removeItem({index: index}));
                  }}>
                  <Image
                    source={require('~/assets/pop_close.png')}
                    style={{width: 20, height: 20}}
                  />
                </Pressable>
              </View>
              <TextRegular>사이드 메뉴 추가선택 : </TextRegular>
              {item.sub.length !== 0 ? (
                item.sub.map((item, index) => (
                  <TextRegular
                    key={index}
                    style={{fontSize: 12, color: colors.fontColorA}}>
                    {item.itemCategory +
                      ' / ' +
                      item.itemName +
                      ' / ' +
                      replaceString(item.itemPrice)}
                    원
                  </TextRegular>
                ))
              ) : (
                <TextRegular style={{fontSize: 12, color: colors.fontColorA}}>
                  없음
                </TextRegular>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <TextBold>
                  {replaceString(
                    cartStore.savedItem.savedItems[index].totalPrice,
                  )}
                </TextBold>
                <OptionCount
                  isTest
                  price={cartStore.mainCount.mainPrice}
                  savedItem={item}
                  index={index}
                  isSummit
                />
              </View>
            </View>
          ))}

          <Pressable
            onPress={() => {
              console.log('path1', cartStore.currentStoreCode);
              navigation.navigate('MenuDetail', {
                jumju_id: cartStore.currentStoreCode.jumju_id,
                jumju_code: cartStore.currentStoreCode.code,
              });
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Image
              source={require('~/assets/ico_plus.png')}
              style={{width: 20, height: 20}}
            />
            <TextBold>더 담으러 가기</TextBold>
          </Pressable>
        </View>
        <DividerL />
        <View style={{flex: 1, paddingHorizontal: 22, paddingTop: 40}}>
          <TextBold>배달/포장 선택</TextBold>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <Pressable
              onPress={() => {
                setIsDelivery(true);
                dispatch(setIsDeliveryStore(true));
              }}
              style={{
                flex: 1,
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                marginRight: 10,
                backgroundColor: isDelivery
                  ? colors.primary
                  : colors.inputBoxBG,
              }}>
              <TextBold
                style={{color: isDelivery ? 'white' : colors.fontColor2}}>
                배달
              </TextBold>
            </Pressable>
            <Pressable
              disabled={DeliveryData.take_out === 'true' ? false : true}
              onPress={() => {
                setIsDelivery(false);
                dispatch(setIsDeliveryStore(false));
              }}
              style={{
                flex: 1,
                borderRadius: 7,
                backgroundColor: isDelivery
                  ? colors.inputBoxBG
                  : colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextBold
                style={{color: !isDelivery ? 'white' : colors.fontColor2}}>
                포장
              </TextBold>
            </Pressable>
          </View>
          <View style={{marginTop: 10}}>
            {isDelivery ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextRegular>배달팁</TextRegular>
                  <TextRegular>
                    {replaceString(DeliveryData.send_cost)}원
                  </TextRegular>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <TextRegular>추가 배달팁</TextRegular>
                  <TextRegular>
                    {replaceString(DeliveryData.send_cost2)}원
                  </TextRegular>
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <TextRegular>포장할인</TextRegular>
                  <TextRegular>
                    {replaceString(DeliveryData.take_out_discount)}원
                  </TextRegular>
                </View>
              </>
            )}

            <View
              style={{height: 1, backgroundColor: colors.borderColor}}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TextBold style={{fontSize: 18}}>총 주문 금액</TextBold>
              <TextBold style={{fontSize: 18}}>
                {replaceString(_getTotalPrice(true))}
              </TextBold>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SummitOrder;
