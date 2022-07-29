import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';
import React from 'react';
import TextBold from '../../component/text/TextBold';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../styles/colors';
import TextMedium from '../../component/text/TextMedium';
import {replaceString} from '../../config/utils/Price';
import {
  removeSavedItem,
  resetSavedItem,
  saveItem,
  setCurrentStoreCode,
  setStoreLogo,
} from '../../store/reducers/CartReducer';
import {customAlert} from '../../component/CustomAlert';
import {setLastPrice} from '../../store/reducers/PaymentReducer';

const CartButton = ({
  navigation,
  goTo,
  lastPrice,
  deliveryData,
  isDelivery,
  data,
}) => {
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cartReducer);
  // const payStore = useSelector(state => state.paymentReducer);

  console.log('store', cartStore);
  console.log('datadatadatadata', data);
  const _getTotalPrice = () => {
    let temp = 0;
    cartStore.savedItem.savedItems.map((item, index) => {
      temp += item.totalPrice;
    });
    return replaceString(temp);
  };

  const _goToCart = () => {
    console.log('currrent cart', cartStore.currentStoreCode);
    navigation.navigate('SummitOrder', {data: data});
  };

  const _getMoreItem = () => {
    console.log('currrent cart', cartStore.currentStoreCode);
    navigation.goBack();
  };

  const _isDiffStore = () => {
    const savedStoreCode = cartStore.savedItem?.savedStoreCode.code;
    const currentStoreCode = data.jumju_code;
    console.log('savedStoreCode 2222', cartStore.savedItem);
    console.log('currentStoreCode  2222', currentStoreCode);
    if (savedStoreCode && currentStoreCode) {
      if (savedStoreCode !== currentStoreCode) {
        dispatch(resetSavedItem());
      }
    }
  };

  const _pressSaveCartButton = () => {
    console.log('data222', data);
    dispatch(
      setCurrentStoreCode({
        code: data.jumju_code,
        jumju_id: data.jumju_id,
        storeName: data.mb_company,
      }),
    );

    dispatch(
      saveItem({
        storeCode: {
          code: data.jumju_code,
          jumju_id: data.jumju_id,
          storeName: data.mb_company,
        },
        items: {
          count: cartStore.mainCount.count,
          main: {
            ...cartStore.mainCount,
            option: cartStore.selectedMainOption,
          },
          sub: cartStore.subItems,
          totalPrice: cartStore.totalPrice,
        },
      }),
    );

    dispatch(setStoreLogo(data.store_logo));

    // _isDiffStore();

    Alert.alert(
      '카트에 메뉴를 담았습니다.',
      '다른 가게의 메뉴를 담으면 카트에 담겨있는 메뉴는 없어집니다.',
      [
        {
          text: '카트로 이동',
          onPress: () => _goToCart(),
        },
        {
          text: '더 담으러 가기',
          onPress: () => _getMoreItem(),
        },
      ],
    );
  };

  const _goToOrderPage = () => {
    navigation.navigate('WriteOrderForm', {
      isDelivery: isDelivery,
      deliveryData: deliveryData,
      lastPrice,
    });
  };

  const _router = () => {
    console.log(
      cartStore.requiredCount,
      Object.keys(cartStore.selectedMainOption).length,
    );
    if (
      cartStore.requiredCount !==
      Object.keys(cartStore.selectedMainOption).length
    ) {
      customAlert('알림', '필수 옵션을 선택해주세요.');
    } else {
      switch (goTo) {
        case 'OrderPage':
          _goToOrderPage();
          break;
        default:
          _pressSaveCartButton();
          break;
      }
    }
  };

  return (
    <Pressable
      onPress={() => {
        _isDiffStore();
        _router();
      }}
      style={{...style.btnContainer}}>
      <View style={{...style.innerView}}>
        <View style={{flex: 1}} />
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextBold style={{color: 'white', fontSize: 16}}>
            {goTo === 'OrderPage'
              ? '주문하기'
              : cartStore.mainCount.count + '개 담기'}
          </TextBold>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <TextMedium style={{color: 'white', fontSize: 16}}>
            {goTo === 'OrderPage'
              ? replaceString(lastPrice)
              : ' ' + replaceString(cartStore.totalPrice) + '원'}
          </TextMedium>
        </View>
      </View>
    </Pressable>
  );
};

export default CartButton;

const style = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: 0,
    zIndex: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  innerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
