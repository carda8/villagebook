import {View, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import colors from '../../styles/colors';
import TextBold from '../../component/text/TextBold';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMainCount,
  setMainCountFromCart,
} from '../../store/reducers/CartReducer';
import Loading from '../../component/Loading';

const OptionCount = ({price, isTest, savedItem, index, isSummit}) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cartReducer);

  console.log('cartStore', cartStore);
  console.log('savedItem', savedItem);
  console.log('isSummit', isSummit, '//', 'index', index);

  const _getSubItemsPrice = () => {
    let subPrice = 0;

    cartStore.subItems.map((item, index) => {
      subPrice += item.itemPrice;
    });

    cartStore.savedItem.savedItems.map((item, index) => {
      console.log('hihi', item);
      if (item.main.option.length > 0) {
        let temp = item.main.option;
        temp.map((item, index) => {
          subPrice += item.price;
          console.log('hello', item);
        });
      }
    });

    return subPrice;
  };

  const _countUp = () => {
    const subPrice = _getSubItemsPrice();

    let mainOptionsPrice = 0;
    cartStore.selectedMainOption.map((item, index) => {
      mainOptionsPrice += item.price;
    });

    if (isSummit) {
      let temp = cartStore.savedItem.savedItems[index].totalPrice;
      console.log('temp', cartStore.savedItem.savedItems[index].totalPrice);
      console.log('path3', index, temp, subPrice, mainOptionsPrice, isSummit);
      dispatch(
        setMainCountFromCart({
          index: index,
          count: cartStore.savedItem.savedItems[index].main.count + 1,
          price:
            cartStore.totalPrice + Number(price) + subPrice + mainOptionsPrice,
        }),
      );
    } else {
      dispatch(
        setMainCount({
          count: cartStore.mainCount.count + 1,
          mainItemCode: cartStore.mainCount.mainItemCode,
          price:
            cartStore.totalPrice + Number(price) + subPrice + mainOptionsPrice,
        }),
      );
    }
  };

  const _countDown = () => {
    const subPrice = _getSubItemsPrice();

    let mainOptionsPrice = 0;
    cartStore.selectedMainOption.map((item, index) => {
      mainOptionsPrice += item.price;
    });

    if (isSummit) {
      if (cartStore.savedItem.savedItems[index].main.count > 1) {
        let temp =
          cartStore.savedItem.savedItems[index].totalPrice -
          cartStore.savedItem.savedItems[index].main.mainPrice;
        dispatch(
          setMainCountFromCart({
            index: index,
            count: cartStore.savedItem.savedItems[index].main.count - 1,
            price: temp - subPrice - mainOptionsPrice,
          }),
        );
      }
    } else {
      if (cartStore.mainCount.count > 1) {
        dispatch(
          setMainCount({
            count: cartStore.mainCount.count - 1,
            mainItemCode: cartStore.mainCount.mainItemCode,
            price:
              cartStore.totalPrice -
              Number(price) -
              subPrice -
              mainOptionsPrice,
          }),
        );
      }
    }
  };

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
          _countDown();
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
        {isSummit ? (
          <TextBold>
            {cartStore.savedItem.savedItems[index].main.count}
          </TextBold>
        ) : (
          <TextBold>{cartStore.mainCount.count}</TextBold>
        )}
      </View>
      <Pressable
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
          _countUp();
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
