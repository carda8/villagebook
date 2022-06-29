import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

const ImageSwipe = () => {
  console.log('image swipe rendered');
  return (
    <Swiper
      loop
      autoplay
      showsPagination={false}
      removeClippedSubviews={false}
      style={{height: 300}}>
      <FastImage
        source={require('~/assets/dummy/CK_tica1140001256_l.jpg')}
        style={{flex: 1}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <FastImage
        source={require('~/assets/dummy/CK_tis101e15040160_l.jpg')}
        style={{flex: 1}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <FastImage
        source={require('~/assets/dummy/CK_tis034d14110158_l.jpg')}
        style={{flex: 1}}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Swiper>
  );
};

export default React.memo(ImageSwipe);

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
