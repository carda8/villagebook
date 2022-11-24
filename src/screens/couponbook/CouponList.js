import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CouponList = ({navigation}) => {
  const layout = useWindowDimensions();

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Image
        source={require('~/assets/no_coupon.png')}
        style={{height: layout.width * 0.7, marginBottom: '30%'}}
        resizeMode="contain"
      />
    </View>
  );
};

export default CouponList;
