import React from 'react';
import {Text} from 'react-native';
import colors from '../../styles/colors';

const TextRegular = ({children, style}) => {
  return (
    <Text
      style={[
        {fontFamily: 'Pretendard-Regular', color: colors.fontColor6},
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TextRegular;
