import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';

const OptionSelect = () => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Text>옵션선택</Text>
    </SafeAreaView>
  );
};

export default OptionSelect;
