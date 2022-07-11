import React from 'react';
import {Text} from 'react-native';
import colors from '../../styles/colors';

const TextBold = ({children, style}) => {
  return (
    <Text
      style={[
        {fontFamily: 'Pretendard-Bold', color: colors.fontColor2},
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TextBold;
