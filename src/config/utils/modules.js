import {Image, Pressable} from 'react-native';
import React from 'react';
export const _setRating = (isTotal, style) => {
  const temp = 5;
  let temp2 = [];

  for (let i = 0; i < temp; i++) {
    temp2.push(
      <Pressable key={i} onPress={() => {}}>
        <Image
          source={require('~/assets/ico_star_on.png')}
          style={[
            {
              width: isTotal ? 20 : 16,
              height: isTotal ? 20 : 16,
              marginHorizontal: 3,
            },
            style,
          ]}
          resizeMode="contain"
        />
      </Pressable>,
    );
  }

  return temp2;
};
