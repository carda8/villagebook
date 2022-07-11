import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';

const Policy = ({navigation, route}) => {
  const routeData = route.params;
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={''} />
      <Text>Policy</Text>
    </SafeAreaView>
  );
};

export default Policy;
