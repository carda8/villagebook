import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../styles/commonStyle';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import colors from '../styles/colors';
import TextRegular from './text/TextRegular';
import {useCustomMutation} from '../hooks/useCustomMutation';

const MainBanner = ({navigation, style, position}) => {
  const {mutateGetBanner} = useCustomMutation();
  const [bannerImg, setBannerImg] = useState([]);
  // console.log('position', position);
  const _getBanner = () => {
    const data = {
      bn_position: position !== 'lifestyle' ? position : '동네편의',
    };

    mutateGetBanner.mutate(data, {
      onSettled: e => {
        if (e.result === 'true' && e.data.arrItems.length > 0) {
          console.log('eeee', e.data.arrItems);
          setBannerImg(e.data.arrItems);
        } else {
          // console.log('fail');
          setBannerImg([]);
        }

        console.log('e', e);
      },
    });
  };

  useEffect(() => {
    _getBanner();
  }, []);

  return (
    <>
      <Swiper
        autoplay
        loop
        autoplayDirection={true}
        autoplayTimeout={5}
        style={{height: 140}}
        containerStyle={style}
        removeClippedSubviews={false}
        renderPagination={(index, total, context) => (
          <>
            <View
              style={{
                top: 110,
                right: 20,
                width: 44,
                height: 21,
                borderRadius: 50,
                alignItems: 'center',
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
        {bannerImg.length > 0 ? (
          bannerImg.map((item, idx) => (
            <Pressable
              key={idx}
              onPress={() => {}}
              style={{
                flex: 1,
                backgroundColor: colors.mainBG3,
                borderRadius: 25,
                overflow: 'hidden',
              }}>
              {/* {console.log('banner count', item.bn_img)} */}
              <FastImage
                source={
                  item.bn_img
                    ? {uri: item.bn_img}
                    : require('~/assets/no_img.png')
                }
                style={{flex: 1}}
                resizeMode={FastImage.resizeMode.cover}
              />
            </Pressable>
          ))
        ) : (
          <Pressable
            onPress={() => {}}
            style={{
              flex: 1,
              backgroundColor: colors.mainBG3,
              borderRadius: 25,
              overflow: 'hidden',
            }}>
            <FastImage
              source={require('~/assets/logo.png')}
              style={{width: 230, flex: 1, alignSelf: 'center'}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Pressable>
        )}
      </Swiper>
    </>
  );
};

export default MainBanner;
