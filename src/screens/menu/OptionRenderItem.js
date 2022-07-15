import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import colors from '../../styles/colors';
import {Pressable} from 'react-native';
import TextRegular from '../../component/text/TextRegular';
import {replaceString} from '../../config/utils/Price';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeSubMenu,
  setMainRequired,
  setSubMenu,
} from '../../store/reducers/CartReducer';
import Loading from '../../component/Loading';

const OptionRenderItem = ({item, data}) => {
  const cartStore = useSelector(state => state.cartReducer);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  // const item2 = item.item;

  return <Loading />;
  return (
    <View
      style={{
        borderColor: colors.borderColor,
        marginVertical: 15,
      }}>
      <View
        style={{
          paddingHorizontal: 22,
        }}>
        <Pressable
          hitSlop={10}
          onPress={() => {
            setCheck(!check);
            if (item.section.required) {
              if (
                cartStore.selectedMainOption[item.section.option] !== item2.name
              ) {
                dispatch(
                  setMainRequired({
                    key: item.section.option,
                    value: item2.name,
                    price: item.item.price,
                  }),
                );
              }
            } else {
              //체크 시
              if (!check)
                dispatch(
                  setSubMenu({
                    itemCode: 1,
                    itemCount: 1,
                    itemPrice: item2.price ?? 0,
                  }),
                );

              //체크 해제 시
              if (check)
                dispatch(
                  removeSubMenu({
                    itemCode: 1,
                    itemCount: 1,
                    itemPrice: item2.price ?? 0,
                  }),
                );
            }
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={
                item.section.required
                  ? cartStore.selectedMainOption[item.section.option]?.val ===
                    item2.name
                    ? require('~/assets/top_ic_map_on.png')
                    : require('~/assets/top_ic_map_off.png')
                  : check
                  ? require('~/assets/top_ic_map_on.png')
                  : require('~/assets/top_ic_map_off.png')
              }
              style={{width: 20, height: 20, marginRight: 10}}
            />
            <TextRegular>{item2.name}</TextRegular>
          </View>

          <TextRegular>+{replaceString(item2.price ?? 0)}원</TextRegular>
        </Pressable>
      </View>
    </View>
  );
};

export default React.memo(OptionRenderItem);
