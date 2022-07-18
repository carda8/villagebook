import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import colors from '../../styles/colors';
import TextBold from '../../component/text/TextBold';
import {useDispatch, useSelector} from 'react-redux';
import {
  addMainCount,
  removeMainCount,
  setMainCount,
} from '../../store/reducers/CartReducer';

const OptionCount = ({price, isTest, savedItem}) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cartReducer);
  console.log('cartStore', cartStore);
  console.log('savedItem', savedItem);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.borderColor,
        width: 150,
        height: 50,
      }}>
      <Pressable
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
          if (cartStore.mainCount.count > 1) {
            if (!isTest) {
              dispatch(
                setMainCount({
                  count: cartStore.mainCount.count - 1,
                  mainItemCode: cartStore.mainCount.mainItemCode,
                  price: cartStore.totalPrice - Number(price),
                }),
              );
            } else setCount(count - 1);
          }
        }}>
        <Image
          source={require('~/assets/ico_minus.png')}
          style={{width: 20, height: 20}}
        />
      </Pressable>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.borderColor,
        }}>
        <TextBold>{cartStore.mainCount.count}</TextBold>
      </View>
      <Pressable
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
          if (!isTest) {
            dispatch(
              setMainCount({
                count: cartStore.mainCount.count + 1,
                mainItemCode: cartStore.mainCount.mainItemCode,
                price: cartStore.totalPrice + Number(price),
              }),
            );
          } else setCount(count + 1);
        }}>
        <Image
          source={require('~/assets/ico_plus.png')}
          style={{width: 20, height: 20}}
        />
      </Pressable>
    </View>
  );
};

export default OptionCount;
