import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';
import React from 'react';
import TextBold from '../../component/text/TextBold';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../styles/colors';
import TextMedium from '../../component/text/TextMedium';
import {replaceString} from '../../config/utils/Price';
import {saveItem} from '../../store/reducers/CartReducer';
import {customAlert} from '../../component/CustomAlert';

const CartButton = ({navigation, goTo}) => {
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cartReducer);
  console.log('store', cartStore);

  const _goToCart = () => {
    dispatch(
      saveItem({
        storeCode: cartStore.currentStoreCode,
        items: {
          main: {
            ...cartStore.mainCount,
            option: {...cartStore.selectedMainOption},
          },
          sub: cartStore.subItems,
          totalPrice: cartStore.totalPrice,
        },
      }),
    );
    navigation.navigate('SummitOrder');
  };

  const _getMoreItem = () => {
    dispatch(
      saveItem({
        storeCode: cartStore.currentStoreCode,
        items: {
          main: {
            ...cartStore.mainCount,
            option: {...cartStore.selectedMainOption},
          },
          sub: cartStore.subItems,
          totalPrice: cartStore.totalPrice,
        },
      }),
    );
    navigation.goBack();
  };

  const _pressSaveCartButton = () => {
    Alert.alert(
      '카트에 메뉴를 담았습니다.',
      '다른 가게의 메뉴를 담으면 현재 담겨있는 메뉴는 없어집니다.',
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
    navigation.navigate('WriteOrderForm');
  };

  const _router = () => {
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
            {' ' + replaceString(cartStore.totalPrice)}원
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
