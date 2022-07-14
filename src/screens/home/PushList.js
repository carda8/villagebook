import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import TextBold from '../../component/text/TextBold';
import Header from '../../component/Header';

const PushList = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header title={'알림함'} navigation={navigation} />
      <View style={{padding: 22, alignItems: 'center'}}>
        <TextBold>알림이 없습니다</TextBold>
      </View>
    </SafeAreaView>
  );
};

export default PushList;
