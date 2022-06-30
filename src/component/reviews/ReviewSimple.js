import {View, Text, Image} from 'react-native';
import React from 'react';
import TextRegular from '../text/TextRegular';

const ReviewSimple = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        source={require('~/assets/ico_star_on.png')}
        style={{width: 17, height: 17}}
        resizeMode="contain"
      />
      <TextRegular> 4.8(count)</TextRegular>
    </View>
  );
};

export default ReviewSimple;
