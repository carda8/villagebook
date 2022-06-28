import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../styles/commonStyle';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import colors from '../styles/colors';
import TextRegular from './text/TextRegular';

const MainBanner = ({navigation, style}) => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <>
      <Swiper
        autoplay
        style={{height: 184}}
        containerStyle={[{marginBottom: 60}, style]}
        removeClippedSubviews={false}
        renderPagination={(index, total, context) => (
          <>
            <View
              style={{
                top: 155,
                right: 20,
                width: 44,
                height: 21,
                alignItems: 'center',
                borderRadius: 50,
                justifyContent: 'center',
                backgroundColor: 'rgba(22, 22, 22, 0.57)',
                position: 'absolute',
              }}>
              <TextRegular style={{color: 'white'}}>
                {index + 1}/{total}
              </TextRegular>
            </View>
          </>
        )}>
        {arr.map((item, idx) => (
          <Pressable
            key={idx}
            onPress={() => {}}
            style={{
              flex: 1,
              backgroundColor: colors.mainBG3,
              borderRadius: 25,
              overflow: 'hidden',
            }}>
            <FastImage
              source={require('~/assets/banner1.png')}
              style={{flex: 1}}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Pressable>
        ))}
      </Swiper>
    </>
  );
};

export default MainBanner;
