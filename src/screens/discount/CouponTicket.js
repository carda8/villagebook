import {View, Text, Pressable} from 'react-native';
import React from 'react';
import TextMedium from '../../component/text/TextMedium';
import TextNotoM from '../../component/text/TextNotoM';
import TextRegular from '../../component/text/TextRegular';
import colors from '../../styles/colors';

const CouponTicket = () => {
  return (
    <View
      style={{
        height: 140,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.borderColor,
        marginBottom: 10,
        marginHorizontal: 22,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
      <View style={{flex: 3, paddingLeft: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextMedium style={{fontSize: 17, color: colors.fontColor2}}>
            1000원 쿠폰
          </TextMedium>
          <View
            style={{
              width: 52,
              height: 24,
              borderRadius: 12,
              backgroundColor: colors.primary,
              marginLeft: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextNotoM style={{fontSize: 12, color: 'white'}}>배달용</TextNotoM>
          </View>
        </View>
        <View style={{marginTop: 8}}>
          <TextRegular>2020.09.01~2020.09.30</TextRegular>
          <TextRegular>이삭토스트</TextRegular>
        </View>
      </View>
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          borderLeftWidth: 1,
          borderColor: colors.borderColor,
          backgroundColor: colors.couponBG,
        }}>
        <TextNotoM style={{color: colors.fontColor2}}>자세히</TextNotoM>
      </Pressable>
    </View>
  );
};

export default CouponTicket;
