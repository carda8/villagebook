import {View, Text, Pressable, Alert} from 'react-native';
import React from 'react';
import TextBold from '../../component/text/TextBold';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../styles/colors';
import TextMedium from '../../component/text/TextMedium';
import {replaceString} from '../../config/utils/Price';
import {saveItem} from '../../store/reducers/CartReducer';

const CartButton = ({navigation}) => {
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cartReducer);
  console.log('store', cartStore);
  return (
    <Pressable
      onPress={() => {
        Alert.alert(
          '카트에 메뉴를 담았습니다.',
          '다른 가게의 메뉴를 담으면 현재 담겨있는 메뉴는 없어집니다.',
          [
            {
              text: '카트로 이동',
              onPress: () => {
                navigation.navigate('CartMain');
              },
            },
            {
              text: '더 담으러 가기',
              onPress: () => {
                dispatch(
                  saveItem({
                    storeCode: cartStore.currentStoreCode,
                    items: {
                      main: [cartStore.mainCount, cartStore.selectedMainOption],
                      sub: cartStore.subItems,
                    },
                  }),
                );
                navigation.goBack();
              },
            },
          ],
        );
      }}
      style={{
        position: 'absolute',
        width: '100%',
        height: 60,
        bottom: 0,
        zIndex: 100,
        backgroundColor: colors.primary,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1}} />
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextBold style={{color: 'white', fontSize: 16}}>
            {cartStore.mainCount.count}개 담기
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
