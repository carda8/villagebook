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

const OptionCount = ({data}) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cartReducer);
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
          if (cartStore.mainCount > 1) {
            dispatch(
              setMainCount({
                count: cartStore.mainCount - 1,
                price: cartStore.totalPrice - data.price,
              }),
            );
            // setCount(count - 1);
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
        <TextBold>{cartStore.mainCount}</TextBold>
      </View>
      <Pressable
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
          dispatch(
            setMainCount({
              count: cartStore.mainCount + 1,
              price: cartStore.totalPrice + data.price,
            }),
          );
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
