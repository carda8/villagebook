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

const CartButton = ({
  navigation,
  goTo,
  lastPrice,
  deliveryData,
  isDelivery,
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

  const _isDiffStore = callback => {
    const savedStoreCode = cartStore.savedItem?.savedStoreCode.code;
    const currentStoreCode = cartStore.currentStoreCode?.code;
    console.log('cartStore ::::::', cartStore);
    console.log('savedStoreCode2', savedStoreCode);
    console.log('currentStoreCode2', currentStoreCode);
    if (savedStoreCode && currentStoreCode) {
      if (savedStoreCode !== currentStoreCode) {
        dispatch(resetSavedItem());
      }
    }
    if (callback) callback(_checkItem);
  };

  const _checkItem = callback => {
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
    if (callback) callback();
    _getMoreItem();
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
    if (callback) callback();
  };

  const _pressSaveCartButton = () => {
    console.log('data222', data);
    const prevStoreCode = cartStore.currentStoreCode.code;
    console.log('prevStoreCode', prevStoreCode);
    if (prevStoreCode !== data.jumju_code && prevStoreCode) {
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
            // onPress: () => _getMoreItem(),
            onPress: () => {
              _isDiffStore(_dispatchStoreCode);
            },
          },
        ],
      );
    } else {
      _checkItem(_dispatchStoreCode);
    }

    if (data.store_logo) dispatch(setStoreLogo(data.store_logo));
  };

  const _goToOrderPage = () => {
    navigation.navigate('WriteOrderForm', {
      isDelivery: isDelivery,
      deliveryData: deliveryData,
      lastPrice,
    });
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
    temp = {...temp, logo: data?.store_logo ?? cartStore.storeLogoUrl};
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
