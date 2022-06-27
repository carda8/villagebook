import React from 'react';
import {Text} from 'react-native';
import colors from '../../styles/colors';

const TextMedium = ({children, style}) => {
  return (
    <Text
      style={[
        {fontFamily: 'Pretendard-Medium', color: colors.fontColor6},
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TextMedium;
