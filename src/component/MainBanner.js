import {View, Text, Pressable, Image, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import colors from '../styles/colors';
import TextRegular from './text/TextRegular';
import {useCustomMutation} from '../hooks/useCustomMutation';
import Swiper from 'react-native-swiper';

const MainBanner = ({navigation, style, position}) => {
  const {mutateGetBanner} = useCustomMutation();
  const [bannerImg, setBannerImg] = useState();
  const layout = useWindowDimensions();

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

  if (!bannerImg || bannerImg.length === 0)
    return (
      <View
        style={{
          width: '100%',
          height: 140,
          borderRadius: 10,
          backgroundColor: colors.mainBG3,
          ...style,
        }}></View>
    );

  return (
    <View style={{flex: 1}}>
      <Swiper
        loop
        autoplay
        autoplayDirection={true}
        autoplayTimeout={1.5}
        style={{height: 140}}
        containerStyle={style}
        removeClippedSubviews={false}
        renderPagination={(index, total, context) => (
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
        )}>
        {bannerImg.map((item, idx) => (
          <Pressable
            key={idx}
            onPress={() => {}}
            style={{
              flex: 1,
              backgroundColor: colors.mainBG3,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <FastImage
              source={{uri: item.bn_img}}
              style={{
                flex: 1,
                maxWidth: layout.width - 44,
                maxHeight: 140,
                borderRadius: 10,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Pressable>
        ))}
      </Swiper>
    </View>
  );
};

export default MainBanner;
