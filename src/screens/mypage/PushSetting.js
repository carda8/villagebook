import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import commonStyles from '../../styles/commonStyle';

const PushSetting = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Text>PushSetting</Text>
    </SafeAreaView>
  );
};

export default PushSetting;
