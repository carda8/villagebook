import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../../styles/commonStyle';
import TextRegular from '../../../component/text/TextRegular';
import Header from '../../../component/Header';

const DeliveryTipDetail = ({route}) => {
  console.log('data Delivery fee', route.params);
  const routeData = route.params?.data;
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'배달팁'} />
      <View style={{padding: 22}}>
        {routeData.map((item, index) => (
          <>
            <TextRegular>{item.dd_charge_start}</TextRegular>
            <TextRegular>{item.dd_charge_start}</TextRegular>
          </>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DeliveryTipDetail;
