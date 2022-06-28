import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';

const DiscountMain = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        title={''}
        navigation={navigation}
        showNoti={true}
        showCart={true}
      />
      <Text>DiscountMain</Text>
    </SafeAreaView>
  );
};

export default DiscountMain;
