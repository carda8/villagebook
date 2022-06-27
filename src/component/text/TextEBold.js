import React from 'react';
import {Text} from 'react-native';
import colors from '../../styles/colors';

const TextEBold = ({children, style}) => {
  return (
    <Text
      style={[
        {fontFamily: 'Pretendard-ExtraBold', color: colors.fontColor6},
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TextEBold;
