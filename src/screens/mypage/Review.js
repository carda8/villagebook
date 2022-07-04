import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import commonStyles from '../../styles/commonStyle';

const Review = ({navigation}) => {
  return (
    <SafeAreaView style={{...commonStyles.safeAreaStyle}}>
      <Text>Review</Text>
    </SafeAreaView>
  );
};

export default Review;
