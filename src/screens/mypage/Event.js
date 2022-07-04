import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import commonStyles from '../../styles/commonStyle';

const Event = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Text>Event</Text>
    </SafeAreaView>
  );
};

export default Event;
