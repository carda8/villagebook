import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import Header from '../../component/Header';

const SignForm = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'회원가입'} navigation={navigation} />
      <View style={{paddingHorizontal: 22}}></View>
    </SafeAreaView>
  );
};

export default SignForm;
