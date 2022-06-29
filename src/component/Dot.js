import {View, Text} from 'react-native';
import React from 'react';
import colors from '../styles/colors';

const Dot = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: 3,
          height: 3,
          borderRadius: 3 / 2,
          marginHorizontal: 7,
          backgroundColor: colors.fontColor6,
        }}></View>
    </View>
  );
};

export default Dot;
