import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

const ImageSwipe = ({images}) => {
  return (
    <Swiper
      loop
      autoplay
      showsPagination={false}
      removeClippedSubviews={false}
      style={{height: 300}}>
      {images.map((item, index) => (
        <View style={{flex: 1}} key={index}>
          <FastImage
            source={{uri: item}}
            style={{flex: 1}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      ))}
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
