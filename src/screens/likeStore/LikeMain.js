import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyle';
import BottomBar from '../../component/BottomBar';
import Header from '../../component/Header';

const LikeMain = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Header
        title={''}
        navigation={navigation}
        showNoti={true}
        showCart={true}
      />
      <Text>LikeMain</Text>
      {/* <BottomBar navigation={navigation} /> */}
    </SafeAreaView>
  );
};

export default LikeMain;
