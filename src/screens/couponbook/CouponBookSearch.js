import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';
import {Pressable} from 'react-native';
import {Image} from 'react-native';
import {TextInput} from 'react-native';
import colors from '../../styles/colors';
import CouponBookSearchBox from './components/CouponBookSearchBox';
import CouponList from './CouponList';

const CouponBookSearch = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <CouponBookSearchBox navigation={navigation} />
      <CouponList navigation={navigation} />
    </SafeAreaView>
  );
};

export default CouponBookSearch;
