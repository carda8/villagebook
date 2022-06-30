import {View, Text} from 'react-native';
import React from 'react';
import TextLight from '../text/TextLight';
import Divider from '../Divider';
import colors from '../../styles/colors';

const ReviewSimple2 = () => {
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextLight style={{color: colors.fontColorA2}}>최근 리뷰 222</TextLight>
      <Divider style={{marginHorizontal: 8}} />
      <TextLight style={{color: colors.fontColorA2}}>
        최근 사장님댓글 222
      </TextLight>
    </View>
  );
};

export default ReviewSimple2;
