import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
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
  updateItem,
} from '../../store/reducers/CartReducer';
import {customAlert} from '../../component/CustomAlert';
import {setLastPrice} from '../../store/reducers/PaymentReducer';
import Loading from '../../component/Loading';
import {useCustomMutation} from '../../hooks/useCustomMutation';
import AuthStorageModuel from '../../store/localStorage/AuthStorageModuel';
import {replace} from 'formik';

const CartButton = ({
  navigation,
  goTo,
  lastPrice,
  deliveryData,
  isDelivery,
  deliveryInfo,
  data,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cartReducer);
  const {mutateDeliveryFee} = useCustomMutation();
  // const payStore = useSelector(state => state.paymentReducer);
  console.log('cartStore  ###', cartStore);
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
    console.log('cartStore ::::::', cartStore);
    console.log('savedStoreCode2', savedStoreCode);
    if (savedStoreCode && currentStoreCode) {
      if (savedStoreCode !== currentStoreCode) {
        dispatch(resetSavedItem());
      }
    }
    _checkItem();
  };

  const _checkItem = () => {
    let mainCount = {...cartStore.mainCount, count: null};
    let temp = {
      // count: cartStore.mainCount.count,
      main: {
        ...mainCount,
        option: cartStore.selectedMainOption,
      },
      sub: cartStore.subItems,
      // totalPrice: cartStore.totalPrice,
    };
    console.log('mainCount', temp);
    if (cartStore.savedItem.savedItems.length > 0) {
      let arrIdx = 'no';
      let temp2 = cartStore.savedItem.savedItems.find((item, index) => {
        let temp3 = {
          ...item,
          main: {
            ...item.main,
            count: null,
          },
        };
        delete temp3.count;
        delete temp3.totalPrice;

        console.log('### item', temp3);

        if (JSON.stringify(temp3) === JSON.stringify(temp)) {
          arrIdx = index;
          return true;
        }
      });
      if (arrIdx !== 'no') {
        console.log('arrIdx', arrIdx);
        console.log('temp2', temp2);
        dispatch(
          updateItem({
            idx: arrIdx,
            price: cartStore.totalPrice,
            count: cartStore.mainCount.count,
          }),
        );
      } else {
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
      }
    } else {
      console.log('path2');
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
    }
    navigation.goBack();

    // _dispatchStoreCode();
  };

  const _dispatchStoreCode = callback => {
    dispatch(
      setCurrentStoreCode({
        code: data.jumju_code,
        jumju_id: data.jumju_id,
        storeName: data.mb_company,
        category: data.category,
      }),
    );
    navigation.goBack();
  };

  const _pressSaveCartButton = () => {
    console.log('data222', data);
    const prevStoreCode = cartStore.currentStoreCode.code;
    console.log('prevStoreCode', prevStoreCode);

    // return;
    if (
      data.jumju_code !== cartStore.savedItem.savedStoreCode.code &&
      cartStore.savedItem.savedStoreCode?.code
    ) {
      Alert.alert(
        '같은 가게의 메뉴만 담을 수 있습니다.',
        '다른 가게의 메뉴를 담으면 카트에 담겨있는 메뉴는 없어집니다.',
        [
          {
            text: '취소',
            onPress: () => _getMoreItem(),
          },
          {
            text: '담기',
            onPress: () => {
              _isDiffStore();
              if (data.store_logo) dispatch(setStoreLogo(data.store_logo));
            },
          },
        ],
      );
    } else {
      _checkItem();
      if (data.store_logo) dispatch(setStoreLogo(data.store_logo));
    }
  };

  const _checkMin = () => {
    const price = Number(String(lastPrice).replace(/[,]/gi, ''));
    if (isDelivery) {
      if (price < deliveryInfo.min_price) {
        customAlert('알림', '배달주문 금액이 최소주문금액 보다 작습니다.');
        return false;
      } else return true;
    } else {
      if (price < deliveryInfo.min_price_wrap) {
        customAlert('알림', '포장주문 금액이 최소주문금액 보다 작습니다.');
        return false;
      } else return true;
    }
  };

  const _goToOrderPage = () => {
    const result = _checkMin();
    console.log('last', lastPrice);
    console.log('deliveryInfo', deliveryInfo);
    if (result) {
      navigation.navigate('WriteOrderForm', {
        isDelivery: isDelivery,
        deliveryData: deliveryData,
        lastPrice,
      });
    }
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

  const _cartStorage = async () => {
    let temp = cartStore.savedItem;
    console.log('_cartStorage1 ::::::::::', temp);
    temp = {
      ...temp,
      logo: data?.store_logo ?? cartStore.storeLogoUrl,
      // totalPrice,
    };
    console.log('_cartStorage2 ::::::::::', temp);
    await AuthStorageModuel._setCartData(temp);
  };

  useEffect(() => {
    _cartStorage();
  }, [cartStore.savedItem]);

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
            {goTo === 'OrderPage'
              ? replaceString(lastPrice)
              : ' ' + replaceString(cartStore.totalPrice) + '원'}
          </TextMedium>
        </View>
      </View>
    </Pressable>
  );
};

export default React.memo(CartButton);

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
