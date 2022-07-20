import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Postcode from '@actbase/react-daum-postcode';

const AddressSearch = ({navigation, route}) => {
  const fromOrder = route.params?.fromWriteOrder;
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Postcode
        style={{flex: 1}}
        jsOptions={{animation: true}}
        onSelected={data => {
          if (fromOrder) {
            navigation.navigate('WriteOrderForm', {addData: data});
          } else {
            navigation.navigate('Map', {data: data});
          }
        }}
      />
    </SafeAreaView>
  );
};

export default AddressSearch;
