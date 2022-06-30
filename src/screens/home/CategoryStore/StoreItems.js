import {
  View,
  Text,
  ScrollView,
  FlatList,
  useWindowDimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import colors from '../../../styles/colors';
import Chip from '../../../component/Chip';
import TextMedium from '../../../component/text/TextMedium';
import TextRegular from '../../../component/text/TextRegular';
import Dot from '../../../component/Dot';
import ReviewSimple from '../../../component/reviews/ReviewSimple';

// 2.1 : 1
const StoreItems = ({navigation, route}) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  console.log('subs rendered');
  console.log('params', route.params);
  const layout = useWindowDimensions();
  const IMG_CONTAINER = layout.width * 0.66; //레이아웃 높이
  const IMG_HEIGHT = IMG_CONTAINER * 0.64; //이미지

  //368 88 279
  const renderItem = item => {
    return (
      <Pressable
        onPress={() => navigation.navigate('MenuDetail')}
        style={{
          flex: 1,
          // height: IMG_CONTAINER,
          marginVertical: 23,
        }}>
        <View
          style={{
            height: IMG_HEIGHT,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              marginRight: 1,
              backgroundColor: 'gray',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              overflow: 'hidden',
            }}>
            <FastImage
              source={require('~/assets/dummy/CK_tica114m19040077_l.jpg')}
              resizeMode={FastImage.resizeMode.cover}
              style={{flex: 1}}
            />
          </View>
          <View
            style={{
              width: layout.width * 0.24,
            }}>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: 10,
                backgroundColor: 'teal',
                marginBottom: 1,
                overflow: 'hidden',
              }}>
              <FastImage
                source={require('~/assets/dummy/CK_tica114m19040204_l.jpg')}
                resizeMode={FastImage.resizeMode.cover}
                style={{flex: 1}}
              />
            </View>
            <View
              style={{
                flex: 1,
                borderBottomRightRadius: 10,
                backgroundColor: 'orange',
                overflow: 'hidden',
              }}>
              <FastImage
                source={require('~/assets/dummy/CK_tica114m19040043_l.jpg')}
                resizeMode={FastImage.resizeMode.cover}
                style={{flex: 1}}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginTop: 22,
          }}>
          <View style={{marginBottom: 9}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextMedium style={{fontSize: 16}}>맛나분식 부산대점</TextMedium>
              <ReviewSimple />
            </View>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 9}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TextRegular style={{color: colors.fontColorA2}}>
                  배달팁{' '}
                </TextRegular>
                <TextRegular style={{color: colors.fontColor6}}>
                  0원~3,000원
                </TextRegular>
                <Dot />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('~/assets/time.png')}
                  style={{width: 14, height: 14}}
                />
                <TextRegular> 30분~</TextRegular>
                <TextRegular>40분</TextRegular>
                <Dot />
              </View>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <TextRegular style={{color: colors.fontColorA2}}>
                  최소 주문{' '}
                </TextRegular>
                <TextRegular>8,000원</TextRegular>
              </View>
            </View>
          </View>
          <Chip coupon={true} newStore={true} takeout={true} />
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={arr}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index}
        onEndReached={() => {}}
      />
    </View>
  );
};

export default StoreItems;
