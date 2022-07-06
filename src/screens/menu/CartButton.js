import {View, Text, Pressable} from 'react-native';
import React from 'react';
import TextBold from '../../component/text/TextBold';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../styles/colors';
import TextMedium from '../../component/text/TextMedium';
import {replaceString} from '../../config/utils/Price';

const CartButton = () => {
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cartReducer);
  console.log('store', cartStore);
  return (
    <Pressable
      onPress={() => {}}
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
            {cartStore.mainCount}개 담기
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
